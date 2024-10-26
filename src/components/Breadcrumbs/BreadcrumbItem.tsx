'use client';

import { Breadcrumb } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';

export function BreadcrumbItem({
  children,
  className,
  ...props
}: BreadcrumbItemProps) {
  return (
    <Breadcrumb
      className={cn('flex items-center', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Breadcrumb>
  );
}

export default BreadcrumbItem;
