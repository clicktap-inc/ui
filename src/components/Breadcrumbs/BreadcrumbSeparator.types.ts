import type { BreadcrumbProps } from 'react-aria-components';
import type { ReactNode } from 'react';

/** @todo what is this type actually trying to do? */
export interface BreadcrumbSeparatorProps
  extends Omit<BreadcrumbProps, 'children'>,
    React.RefAttributes<HTMLLIElement> {
  children?: ReactNode;
}
