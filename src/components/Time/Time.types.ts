import type { ReactNode } from 'react';

export type TimeProps = Intl.DateTimeFormatOptions & {
  /** BCP 47 locale used for formatting. Defaults to `en-US`. */
  locale?: string;
  /** Rendered when `children` is missing or not a valid date. Defaults to `-`. */
  fallback?: ReactNode;
  /** The instant to render — ISO string, `Date`, or epoch milliseconds. */
  children?: string | Date | number;
  /**
   * Opt this output into the viewer's local ("client") timezone instead of the configured
   * default ("server") timezone. Falls back to the server timezone when the viewer's zone is
   * not yet known (no cookie), so first-render output stays hydration-safe. Defaults to
   * `false` (server time).
   */
  local?: boolean;
  /**
   * Append the timezone abbreviation (e.g. "EST") to the output. Shorthand for
   * `timeZoneName: 'short'`; an explicit `timeZoneName` always wins.
   */
  showZone?: boolean;
};
