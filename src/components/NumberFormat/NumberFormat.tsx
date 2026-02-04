'use client';

import { NumberFormatProps } from './NumberFormat.types';

export function NumberFormat({
  locale = 'en-US',
  style = 'decimal',
  fallback = '-',
  children,
  ...options
}: NumberFormatProps) {
  return children != null
    ? new Intl.NumberFormat(locale, { ...options, style }).format(
        Number(children),
      )
    : fallback;
}

export default NumberFormat;
