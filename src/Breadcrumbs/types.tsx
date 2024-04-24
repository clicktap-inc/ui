import {
  BreadcrumbProps,
  type BreadcrumbsProps as AriaBreadcrumbsProps,
  LinkProps,
} from 'react-aria-components';
import React, { ReactNode } from 'react';

export interface Breadcrumb extends LinkProps {
  name: string;
  component?: ReactNode;
}

export interface BreadcrumbItemProps
  extends Omit<BreadcrumbProps, 'children'>,
    React.RefAttributes<HTMLLIElement> {
  children?: ReactNode;
}

export type BreadcrumbsProps<T extends object> = Omit<
  AriaBreadcrumbsProps<T>,
  'items'
>;
