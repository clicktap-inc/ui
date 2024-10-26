import type { BreadcrumbsProps as AriaBreadcrumbsProps } from 'react-aria-components';

export type BreadcrumbsProps<T extends object> = Omit<
  AriaBreadcrumbsProps<T>,
  'items'
>;
