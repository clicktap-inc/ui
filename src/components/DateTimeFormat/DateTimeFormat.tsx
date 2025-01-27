'use client';

import type { DateTimeFormatProps } from './DateTimeFormat.types';

export function DateTimeFormat({
  locale = 'en-US',
  fallback = '-',
  children,
  ...options
}: DateTimeFormatProps) {
  return children && !Number.isNaN(new Date(children).valueOf())
    ? new Intl.DateTimeFormat(locale, options).format(new Date(children))
    : fallback;
}

export default DateTimeFormat;
