'use client';

import { Link } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { BreadcrumbLinkProps } from './BreadcrumbLink.types';

export function BreadcrumbLink({
  children,
  className,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <Link
      className={cn(
        'text-slate-600 no-underline cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline focus-visible:outline-slate-200',
        'hover:text-slate-900 hover:underline',
        'current:cursor-default current:text-slate-900 current:font-semibold',
        'disabled:cursor-default disabled:text-slate-400 disabled:current:text-slate-900',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export default BreadcrumbLink;
