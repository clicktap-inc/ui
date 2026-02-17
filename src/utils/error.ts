import { isDevelopment } from './env';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again later.';

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
    // Duck-type HTTP status from graphql-request ClientError shape
    const status =
      error != null &&
      typeof error === 'object' &&
      'response' in error &&
      typeof (error as Record<string, unknown>).response === 'object'
        ? ((error as Record<string, Record<string, unknown>>).response
            ?.status as number | undefined)
        : undefined;
    console.error('[Request Error]', ...(status ? [status] : []), error);
  }

  return fallback;
}

export default getSafeErrorMessage;
