import { LinkProps, Link } from 'react-aria-components';
import { cn } from '../utils';

export function BreadcrumbLink({ children, className, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        'text-slate-600 no-underline cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline focus-visible:outline-slate-200',
        'hover:text-slate-900 hover:underline',
        'current:cursor-default current:text-slate-900 current:font-semibold',
        'disabled:cursor-default disabled:text-slate-400 disabled:current:text-slate-900',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Link>
  );
}

export default BreadcrumbLink;
