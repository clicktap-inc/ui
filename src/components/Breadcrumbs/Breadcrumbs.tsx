'use client';

import { Breadcrumbs as AriaBreadcrumbs } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export function Breadcrumbs({
  children,
  className,
  ...props
}: BreadcrumbsProps<object>) {
  return (
    <AriaBreadcrumbs
      className={cn(
        'flex items-center list-none text-sm',
        'mx-0 mt-0 mr-4',
        'px-0 pt-1.5 pb-0',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </AriaBreadcrumbs>
  );
}

export default Breadcrumbs;
