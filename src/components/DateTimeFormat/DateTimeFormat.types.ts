import type { ReactNode } from 'react';

export type DateTimeFormatProps = Intl.DateTimeFormatOptions & {
  locale?: string;
  fallback?: ReactNode;
  children?: string | Date;
};
