'use client';

import { useTimezone } from '../Timezone';
import type { TimeProps } from './Time.types';

/**
 * Renders an instant as a localized, timezone-aware `<time>` element.
 *
 * The displayed string is formatted in the **server** timezone from `TimezoneProvider` by
 * default; pass `local` to render it in the viewer's timezone instead. Because the resolved
 * timezone comes from context (identical on server and client) and `Intl.DateTimeFormat` is
 * deterministic, server and first client render produce the same string — no hydration
 * mismatch. The machine-readable `dateTime` attribute always carries the unambiguous UTC
 * instant regardless of the displayed zone.
 */
export function Time({
  locale = 'en-US',
  fallback = '-',
  children,
  local = false,
  showZone = false,
  timeZone: timeZoneOverride,
  timeZoneName,
  ...options
}: TimeProps) {
  const { timezone, viewerTimezone } = useTimezone();

  if (children === undefined || children === null) {
    return <>{fallback}</>;
  }

  const date = new Date(children);
  if (Number.isNaN(date.valueOf())) {
    return <>{fallback}</>;
  }

  const resolvedTimeZone =
    timeZoneOverride ?? (local ? (viewerTimezone ?? timezone) : timezone);

  const formatted = new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: resolvedTimeZone,
    timeZoneName: timeZoneName ?? (showZone ? 'short' : undefined),
  }).format(date);

  return <time dateTime={date.toISOString()}>{formatted}</time>;
}

export default Time;
