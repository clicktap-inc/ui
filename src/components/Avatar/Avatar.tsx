'use client';

import { cn } from '../../utils/cn';
import type { AvatarProps } from './Avatar.types';

/**
 * Default user icon SVG
 */
function DefaultIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * SSR-compatible Avatar component.
 * Pure Tailwind implementation that works with Next.js App Router SSR.
 */
export function Avatar({
  icon,
  className,
  isDisabled,
  size = 'md',
  classNames,
  isBordered,
  radius = 'full',
  name,
  src,
  alt,
}: AvatarProps) {
  return (
    <div className={cn('group', 'z-10', 'first:ms-0', className)}>
      <div
        className={cn(
          'transition-transform duration-300 ease-in-out',
          'bg-slate-100',
          'flex items-center justify-center',
          'relative',
          'z-10',
          'overflow-hidden',
          isDisabled ? 'opacity-50' : 'opacity-100',
          [
            size === 'sm' && 'h-8 w-8 text-xs',
            size === 'md' && 'h-10 w-10 text-sm',
            size === 'lg' && 'h-12 w-12 text-base',
          ],
          [
            radius === 'full' && 'rounded-full',
            radius === 'lg' && 'rounded-2xl',
            radius === 'md' && 'rounded-xl',
            radius === 'sm' && 'rounded-lg',
            radius === 'none' && 'rounded-none',
          ],
          isBordered &&
            'shadow-[#fff_0px_0px_0px_2px,_#f1f5f9_0px_0px_0px_4px,_#00000000_0px_0px_0px_0px]',
          classNames?.base,
        )}
      >
        {/* Image (if src provided) */}
        {src && (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={cn(
              'absolute',
              'w-full',
              'h-full',
              'overflow-hidden',
              'object-cover',
              'object-center',
              classNames?.icon,
            )}
          />
        )}

        {/* Name/initials (if name provided and no src) */}
        {!src && name && (
          <span
            className={cn(
              'flex items-center justify-center',
              'text-center',
              'max-w-full',
              'overflow-hidden',
              'font-medium',
              classNames?.name,
            )}
          >
            {name}
          </span>
        )}

        {/* Fallback icon (if no src and no name) */}
        {!src && !name && (
          <span
            className={cn(
              'flex items-center justify-center',
              classNames?.fallback,
            )}
          >
            {icon || <DefaultIcon />}
          </span>
        )}
      </div>
    </div>
  );
}

export default Avatar;
