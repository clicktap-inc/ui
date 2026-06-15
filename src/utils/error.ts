import { isDevelopment } from './env';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again later.';

/**
 * Structurally extract the HTTP status from a `graphql-request` `ClientError`
 * (or any error carrying `response.status`) — without an `instanceof` check.
 *
 * `graphql-request` is bundled per consuming package, so an
 * `error instanceof ClientError` using a consumer's *own* copy of the class
 * fails for an error thrown by `@clicktap/ui`'s bundled copy (the dual-package
 * hazard) — the redirect / logout path then silently never fires. Duck-typing
 * `response.status` is identity-agnostic and works regardless of which copy
 * threw, so prefer this at cross-package boundaries (SSR route/data fetches,
 * actor error handlers) over `instanceof`.
 *
 * Returns `undefined` when no numeric status is present.
 */
export function getRequestErrorStatus(error: unknown): number | undefined {
  if (error == null || typeof error !== 'object' || !('response' in error)) {
    return undefined;
  }

  const response = (error as { response?: unknown }).response;
  if (
    response == null ||
    typeof response !== 'object' ||
    !('status' in response)
  ) {
    return undefined;
  }

  const status = (response as { status?: unknown }).status;
  return typeof status === 'number' ? status : undefined;
}

/**
 * Returns a safe, user-facing error message.
 *
 * In development, logs the full error (including HTTP status when available)
 * to the console. In all environments, returns the `fallback` string instead
 * of leaking internal details to the UI.
 */
export function getSafeErrorMessage(
  error: unknown,
  fallback: string = DEFAULT_MESSAGE,
): string {
  if (isDevelopment) {
    const status = getRequestErrorStatus(error);
    console.error('[Request Error]', ...(status ? [status] : []), error);
  }

  return fallback;
}

export default getSafeErrorMessage;
