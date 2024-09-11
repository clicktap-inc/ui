import { BreadcrumbProps, Breadcrumb } from 'react-aria-components';
import { cn } from '../utils';

export function BreadcrumbItem({
  children,
  className,
  ...props
}: BreadcrumbProps) {
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
