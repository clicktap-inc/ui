import { Breadcrumb } from 'react-aria-components';
import { cn } from '../utils';
import { BreadcrumbItemProps } from './types';

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbItemProps) {
  return (
    <Breadcrumb
      className={cn('flex items-center text-slate-600', 'my-0 mx-2', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="w-4 h-4"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Breadcrumb>
  );
}

export default BreadcrumbSeparator;
