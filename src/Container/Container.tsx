import { forwardRef, HTMLAttributes } from 'react';
import type { ForwardedRef } from 'react';
import { cn } from '../utils';

export const Container = forwardRef(
  (
    { children, className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cn('container', 'mx-auto my-0', 'py-0 px-4', className)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Container;
