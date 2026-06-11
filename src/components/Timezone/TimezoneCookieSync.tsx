'use client';

import { useEffect } from 'react';

/** Cookie name carrying the viewer's IANA timezone for server-side `local`-mode rendering. */
export const TIMEZONE_COOKIE_NAME = 'displayTimezone';

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type TimezoneCookieSyncProps = {
  /** Cookie lifetime in seconds. Defaults to one year. */
  maxAgeSeconds?: number;
};

/**
 * Writes the viewer's detected timezone to a cookie **after hydration** (in an effect only —
 * never during render), so the *next* server render can resolve `local`-mode timestamps in
 * the viewer's zone deterministically. Renders nothing.
 *
 * Setting the cookie only in an effect is deliberate: the current render must not re-resolve
 * the timezone from the browser, or it would diverge from the server output and reintroduce
 * the hydration mismatch this whole mechanism exists to avoid.
 */
export function TimezoneCookieSync({
  maxAgeSeconds = ONE_YEAR_SECONDS,
}: TimezoneCookieSyncProps = {}) {
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        document.cookie = `${TIMEZONE_COOKIE_NAME}=${encodeURIComponent(tz)};path=/;max-age=${maxAgeSeconds};samesite=lax`;
      }
    } catch {
      // Best-effort: if the environment can't resolve a timezone, leave the cookie unset and
      // `local` outputs fall back to the server timezone.
    }
  }, [maxAgeSeconds]);

  return null;
}
