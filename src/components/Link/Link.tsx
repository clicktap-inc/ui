'use client';

import { forwardRef, useMemo } from 'react';
import { Link as AriaLink } from 'react-aria-components';
import { cn } from '../../utils/cn';
import { useLinkConfig } from './LinkContext';
import { isExternalUrl } from './utils';
import type { LinkProps } from './Link.types';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, isDisabled, className, href, target, rel, ...props }, ref) => {
    const { baseUrl } = useLinkConfig();

    const isExternal = useMemo(
      () => (href ? isExternalUrl(href, baseUrl) : false),
      [href, baseUrl],
    );

    return (
      <AriaLink
        {...props}
        href={href}
        isDisabled={isDisabled}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
        className={(renderProps) => {
          const userClasses =
            typeof className === 'function'
              ? className(renderProps)
              : className;

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
            userClasses,
          );
        }}
        ref={ref}
      >
        {children}
      </AriaLink>
    );
  },
);

Link.displayName = 'Link';

export default Link;
