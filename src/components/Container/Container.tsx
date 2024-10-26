'use client';

import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import type { ContainerProps } from './Container.types';
import { cn } from '../../utils/cn';

export const Container = forwardRef(
  (
    { children, className, ...props }: ContainerProps,
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
