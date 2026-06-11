'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type TimezoneConfig = {
  /**
   * The configured default ("server") timezone — an IANA identifier resolved on the server
   * (the `display/default_timezone` setting, or the PHP default when unset) and passed down
   * so server and client render identical date/time output. This is the default zone every
   * `<Time>` renders in.
   */
  timezone: string;
  /**
   * The viewer's ("client") timezone, when known — typically derived server-side from a
   * cookie set by `TimezoneCookieSync`. Only used by outputs that opt in via the `local`
   * prop. Undefined until the cookie is present (first visit), in which case `local` outputs
   * fall back to `timezone`, keeping rendering hydration-safe.
   */
  viewerTimezone?: string;
};

/**
 * Default is `UTC` so that, absent a provider, output is still deterministic across server
 * and client (no hydration mismatch). In practice consumers always wrap their tree with
 * `TimezoneProvider` fed by the server-resolved timezone.
 */
const TimezoneContext = createContext<TimezoneConfig>({ timezone: 'UTC' });

type TimezoneProviderProps = {
  children: ReactNode;
  timezone: string;
  viewerTimezone?: string;
};

export function TimezoneProvider({
  children,
  timezone,
  viewerTimezone,
}: TimezoneProviderProps) {
  return (
    <TimezoneContext.Provider value={{ timezone, viewerTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  return useContext(TimezoneContext);
}
