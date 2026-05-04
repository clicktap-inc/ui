# Auth-aware GraphQL client — `@clicktap/ui/utils/createAuthAwareGraphqlClient`

**Date:** 2026-05-03
**Affects:** `@clicktap/ui/utils/createAuthAwareGraphqlClient` — new export
**Classification:** IMPROVEMENT
**Breaking:** No (additive)

## Dependencies

*None.*

## Summary

Adds two factories and an event bus for handling `graphql-request` responses uniformly across consumer apps:

- `createAuthAwareGraphqlClient()` — returns a `request(url, doc, vars, headers)` callable plus a `.withOptions({ … signal })` overload. Drop-in for any caller that previously used bare `request()` from `graphql-request`.
- `createAuthAwareFetch()` — returns a `fetch` function suitable for `new GraphQLClient(url, { fetch: … })` when the caller manages their own client config (cors, credentials, custom headers).
- `authAwareEvents` — a small, app-runtime-agnostic event bus. Both factories dispatch `unauthenticated` (HTTP 401), `permissionDenied` (403), and `serverError` (5xx) events. Consumer apps subscribe from a Provider component (where xstate actors and routers are in scope) to wire logout / toast / redirect.

The `request()` form additionally returns the partial `data` from a HTTP-200-with-errors response — single-field GraphQL errors don't tear down the whole UI. (Same behavior the prior project-level `apps/frontend/utils/graphqlRequest.ts` had — moved here so every consumer gets it for free.)

## Why

Every consumer app was reinventing the same four pieces in its own actors / mutation handlers:

1. 401 → log out + toast + redirect to login
2. 403 → permission-denied toast
3. 5xx → service-unavailable toast
4. Partial responses → return `data`, don't throw

The 401 path in particular was load-bearing for the upcoming "no-guest storefront" pattern (see [`2026-05-03-guest-checkout-disabled-storefront.md`](#) cross-app guides), but its scope is broader: any project that wants its session-expired UX coherent benefits.

The factory pattern decouples the lib from app runtime context. The lib emits typed events; the app subscribes from a Provider where it has the runtime concerns (auth machine, toast actor, router). Lib stays pure; consumers stay flexible.

## Public API

```ts
import {
  createAuthAwareGraphqlClient,
  createAuthAwareFetch,
  authAwareEvents,
  type AuthAwareEventName,
  type AuthAwareEventDetail,
} from '@clicktap/ui/utils/createAuthAwareGraphqlClient';
```

```ts
/**
 * Returns a callable: `(url, document, variables?, headers?) => Promise<TData>`.
 * Plus a `.withOptions({ url, document, variables?, headers?, signal? })` form
 * for actors needing AbortSignal support.
 *
 * Internally creates a fresh GraphQLClient per call. On error: dispatches
 * the appropriate event (401/403/5xx) and either rethrows or returns the
 * partial `data` from a HTTP-200-with-errors response.
 */
function createAuthAwareGraphqlClient(): AuthAwareGraphqlClient;

/**
 * Returns a `fetch` function. Pass to:
 *   new GraphQLClient(url, { fetch: createAuthAwareFetch(), credentials, mode, … })
 *
 * Wraps the global `fetch`. On 401/403/5xx response, dispatches the
 * matching event with `{ status, response }`. The original Response is
 * returned untouched — graphql-request still parses, throws, etc. exactly
 * as it would have. The event dispatch is a side channel.
 */
function createAuthAwareFetch(): typeof fetch;

/**
 * Module-level event bus. Subscribe with a callback; returns an unsubscribe
 * function.
 *
 *   authAwareEvents.subscribe('unauthenticated', ({ status, error, response }) => { … });
 */
export const authAwareEvents: {
  subscribe(name: AuthAwareEventName, listener: (detail: AuthAwareEventDetail) => void): () => void;
  dispatch(name: AuthAwareEventName, detail: AuthAwareEventDetail): void;
};

type AuthAwareEventName = 'unauthenticated' | 'permissionDenied' | 'serverError';
interface AuthAwareEventDetail {
  status: number;
  /** Set when triggered from a `graphql-request` ClientError. */
  error?: ClientError;
  /** Set when triggered from the fetch wrapper. */
  response?: Response;
}
```

## Pattern for consumers

Inside a Provider component (where actors + router + toast are in scope):

```tsx
import { authAwareEvents } from '@clicktap/ui/utils/createAuthAwareGraphqlClient';
import { useAuth } from '@/state/auth/AuthProvider';
import { useToast } from '@/state/toast/ToastProvider';

function AuthAwareEventBridge({ children }: { children: ReactNode }) {
  const { authActor } = useAuth();
  const { toastActor } = useToast();

  useEffect(() => {
    const unsubUnauth = authAwareEvents.subscribe('unauthenticated', () => {
      authActor.send({ type: 'LOGOUT' });
      toastActor.send({
        type: 'ADD_ITEM',
        item: <Alert type="error" title="Session expired" message="Please log in again." />,
        duration: 5000,
      });
    });
    const unsubPerm = authAwareEvents.subscribe('permissionDenied', () => {
      toastActor.send({
        type: 'ADD_ITEM',
        item: <Alert type="error" title="Permission denied" />,
        duration: 5000,
      });
    });
    const unsub5xx = authAwareEvents.subscribe('serverError', () => {
      toastActor.send({
        type: 'ADD_ITEM',
        item: <Alert type="error" title="Service unavailable" />,
        duration: 5000,
      });
    });
    return () => { unsubUnauth(); unsubPerm(); unsub5xx(); };
  }, [authActor, toastActor]);

  return <>{children}</>;
}
```

For raw callers, two flavors:

**Caller that previously used `request()` from `graphql-request`:**

```ts
// Before
import { request } from 'graphql-request';
const data = await request(url, document, vars, headers);

// After
import { graphqlRequest } from '@/utils/graphqlRequest';
// where graphqlRequest is `createAuthAwareGraphqlClient()` instantiated once at module scope
const data = await graphqlRequest(url, document, vars, headers);
```

**Caller that constructs its own `GraphQLClient`:**

```ts
// Before
const client = new GraphQLClient(url, { credentials: 'include', mode: 'cors' });

// After
import { createAuthAwareFetch } from '@clicktap/ui/utils/createAuthAwareGraphqlClient';
const client = new GraphQLClient(url, {
  credentials: 'include',
  mode: 'cors',
  fetch: createAuthAwareFetch(),
});
```

## Migration Steps

This is purely additive — existing code keeps compiling. To adopt:

### 1. Bump `@clicktap/ui`

```bash
pnpm up @clicktap/ui
```

Minimum version: **next minor after the release that ships this migration**.

### 2. Build a Provider-level event bridge

Mount it once high in the tree (alongside `AuthProvider` / `ToastProvider`). Subscribe to the three events, dispatch into your project's runtime. See "Pattern for consumers" above.

### 3. (Incremental) Migrate actors that hit gated GraphQL operations

For any actor that performs a mutation the backend has gated behind auth (e.g. cart mutations on a no-guest storefront), switch its GraphQL call to one of the two forms above. The wrapping is what fires the events.

Actors that hit non-gated operations don't need migration unless you want their 5xx / 403 to surface a toast too — adopt incrementally.

## Verification

- **Typecheck** clean.
- **Browser smoke test**:
  1. Mount a page that performs a wrapped GraphQL request.
  2. Force the response to 401 (devtools → request blocking → respond with 401, or expire the JWT).
  3. Confirm: subscriber callback fires; auth/toast/router behave as wired.
  4. Repeat for 403 and 503.

## Files Changed

| File | Change |
|---|---|
| `libs/ui/src/utils/createAuthAwareGraphqlClient.ts` | NEW — factories + event bus |

## References

- Frontend wiring (consumes this): [`apps/frontend/.../2026-05-03-guest-checkout-disabled-storefront.md`](../../../../../apps/frontend/docs/migrations/2026/05/2026-05-03-guest-checkout-disabled-storefront.md)
- Backend that 401s the gated operations: [`apps/middleware/.../2026-05-03-guest-checkout-disabled-storefront.md`](../../../../../apps/middleware/docs/migrations/2026/05/2026-05-03-guest-checkout-disabled-storefront.md)
