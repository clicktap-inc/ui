'use client';

import { forwardRef } from 'react';
import { Link as UiLink } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { LinkProps } from './Link.types';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, isDisabled, className, ...props }, ref) => (
    <UiLink
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      isDisabled={isDisabled}
      className={(renderProps) => {
        const userClasses =
          typeof className === 'function' ? className(renderProps) : className;

        return cn(
          'flex items-center cursor-pointer',
          'text-slate-500',
          'no-underline',
          'transition-colors duration-300',
          'hover:text-slate-800',
          [
            'data-[disabled="true"]:cursor-default',
            'data-[disabled="true"]:text-slate-300',
            'data-[disabled="true"]:hover:text-slate-300',
          ],
          userClasses
        );
      }}
      ref={ref}
    >
      {children}
    </UiLink>
  )
);

export default Link;
