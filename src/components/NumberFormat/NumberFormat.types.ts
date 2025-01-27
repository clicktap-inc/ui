import type { ReactNode } from 'react';

export type NumberFormatProps = Omit<Intl.NumberFormatOptions, 'style'> & {
  locale?: string;
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  fallback?: ReactNode;
  children?: string | number;
};
