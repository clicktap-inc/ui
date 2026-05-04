/**
 * Auth-aware wrappers around `graphql-request`.
 *
 * Centralizes four behaviors that consumer apps would otherwise re-implement
 * in every actor / mutation handler:
 *
 *   1. **401 → dispatch expired-session event.** Lets the app's auth machine
 *      log the user out, toast "session expired", and redirect to login.
 *   2. **403 → dispatch permission-denied event.**
 *   3. **5xx → dispatch server-error event.**
 *   4. **Partial responses (HTTP 200 with both `data` and `errors`).** The
 *      `graphqlRequest()` form returns the partial `data` rather than
 *      throwing — single field errors don't tear down the whole UI.
 *
 * Decoupled from app runtime context (xstate actors, routers, toast systems)
 * via an event bus. The wrappers dispatch typed events on the bus; the app
 * subscribes from a Provider component where actors and router are in scope.
 *
 * Two entry points:
 *
 *   - `createAuthAwareGraphqlClient()` — returns a `request(url, doc, …)`
 *     callable. Drop-in for SSR or simple call sites that just need
 *     "fetch with the right headers and bail on errors". Internally creates
 *     a fresh `GraphQLClient` per request.
 *
 *   - `createAuthAwareFetch()` — returns a `fetch` function that dispatches
 *     events on 401/403/5xx. Pass to `new GraphQLClient(url, { fetch: … })`
 *     in actors that already manage their own client config (cors,
 *     credentials, custom headers per-call). The fetch wrapper sees the raw
 *     HTTP response *before* `graphql-request` interprets it, so it catches
 *     all status codes regardless of how the client is configured.
 *
 * Subscribe to events via the shared bus:
 *
 *   import { authAwareEvents } from '@clicktap/ui/utils/createAuthAwareGraphqlClient';
 *   const unsub = authAwareEvents.subscribe('unauthenticated', ({ status }) => { … });
 */

import {
  ClientError,
  GraphQLClient,
  type RequestDocument,
  type Variables,
} from 'graphql-request';
import type { GraphQLClientRequestHeaders } from 'graphql-request/build/esm/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type AuthAwareEventName =
  | 'unauthenticated'
  | 'permissionDenied'
  | 'serverError';

export interface AuthAwareEventDetail {
  status: number;
  /** Present when the trigger came from a `graphql-request` ClientError. */
  error?: ClientError;
  /** Present when the trigger came from the fetch wrapper. */
  response?: Response;
}

type AuthAwareEventListener = (detail: AuthAwareEventDetail) => void;

class AuthAwareEventBus {
  private readonly listeners: Map<
    AuthAwareEventName,
    Set<AuthAwareEventListener>
  > = new Map();

  subscribe(
    name: AuthAwareEventName,
    listener: AuthAwareEventListener,
  ): () => void {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, new Set());
    }
    this.listeners.get(name)!.add(listener);
    return () => {
      this.listeners.get(name)?.delete(listener);
    };
  }

  dispatch(name: AuthAwareEventName, detail: AuthAwareEventDetail): void {
    this.listeners.get(name)?.forEach((listener) => listener(detail));
  }
}

/**
 * Module-level event bus. A single instance is shared across all callers
 * in a given runtime — keeps the subscription model simple (one place to
 * listen, regardless of which call triggered the event).
 */
export const authAwareEvents = new AuthAwareEventBus();

function dispatchByStatus(status: number, detail: AuthAwareEventDetail): void {
  if (status === 401) {
    authAwareEvents.dispatch('unauthenticated', detail);
  } else if (status === 403) {
    authAwareEvents.dispatch('permissionDenied', detail);
  } else if (status >= 500) {
    authAwareEvents.dispatch('serverError', detail);
  }
}

function dispatchFromError(error: unknown): void {
  if (!(error instanceof ClientError)) {
    return;
  }
  const status = error.response?.status;
  if (typeof status !== 'number') {
    return;
  }
  dispatchByStatus(status, { status, error });
}

function handlePartialResponse<TData>(error: unknown): TData {
  if (error instanceof ClientError && error.response?.data) {
    const { data, errors } = error.response as {
      data: TData;
      errors?: Array<{ message: string; path?: Array<string | number> }>;
    };

    if (data) {
      if (process.env.NODE_ENV === 'development' && errors?.length) {
        for (const err of errors) {
          console.error(
            `[GraphQL] Field error at ${err.path?.join('.') ?? 'unknown'}:`,
            err.message,
          );
        }
      }

      return data;
    }
  }

  throw error;
}

export type AuthAwareGraphqlRequest = <
  TData,
  TVariables extends Variables = Variables,
>(
  url: string,
  document: RequestDocument | TypedDocumentNode<TData, TVariables>,
  variables?: TVariables,
  requestHeaders?: GraphQLClientRequestHeaders,
) => Promise<TData>;

export type AuthAwareGraphqlRequestWithOptions = <
  TData,
  TVariables extends Variables = Variables,
>(options: {
  url: string;
  document: RequestDocument | TypedDocumentNode<TData, TVariables>;
  variables?: TVariables;
  requestHeaders?: GraphQLClientRequestHeaders;
  signal?: AbortSignal;
}) => Promise<TData>;

export type AuthAwareGraphqlClient = AuthAwareGraphqlRequest & {
  withOptions: AuthAwareGraphqlRequestWithOptions;
};

export function createAuthAwareGraphqlClient(): AuthAwareGraphqlClient {
  const request: AuthAwareGraphqlRequest = async (
    url,
    document,
    variables,
    requestHeaders,
  ) => {
    const client = new GraphQLClient(url, { headers: requestHeaders });
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return await (client.request as any)({ document, variables });
    } catch (error: unknown) {
      dispatchFromError(error);
      return handlePartialResponse(error);
    }
  };

  const withOptions: AuthAwareGraphqlRequestWithOptions = async (options) => {
    const client = new GraphQLClient(options.url, {
      headers: options.requestHeaders,
      signal: options.signal,
    });
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return await (client.request as any)({
        document: options.document,
        variables: options.variables,
      });
    } catch (error: unknown) {
      dispatchFromError(error);
      return handlePartialResponse(error);
    }
  };

  const client = request as AuthAwareGraphqlClient;
  client.withOptions = withOptions;
  return client;
}

/**
 * Returns a `fetch` function that delegates to the global `fetch` and
 * dispatches `authAwareEvents` on 401/403/5xx responses. Pass to
 * `new GraphQLClient(url, { fetch: createAuthAwareFetch() })` from an
 * actor that needs custom client config.
 *
 * The wrapped fetch returns the original Response untouched on success
 * AND on error — `graphql-request` still parses, throws, etc. exactly
 * as it would have. The event dispatch is a side channel for the app
 * to react to the auth state without coupling actor code to router /
 * toast actors.
 */
export function createAuthAwareFetch(): typeof fetch {
  return async function authAwareFetch(input, init) {
    const response = await fetch(input, init);
    if (
      response.status === 401 ||
      response.status === 403 ||
      response.status >= 500
    ) {
      // Clone so the consumer (graphql-request) still gets a fresh body to read.
      dispatchByStatus(response.status, {
        status: response.status,
        response: response.clone(),
      });
    }
    return response;
  };
}
