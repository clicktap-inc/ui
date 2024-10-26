'use client';

import { useAvatarGroupContext, Avatar as UiAvatar } from '@nextui-org/avatar';
import { cn } from '../../utils/cn';
import type { AvatarProps } from './Avatar.types';

export function Avatar({
  icon,
  className,
  isDisabled,
  size,
  classNames,
  isBordered,
  radius,
  ...props
}: AvatarProps) {
  const avatarGroupContext = useAvatarGroupContext();
  return (
    <div
      className={cn(
        'group',
        'z-10',
        'first:ms-0',
        !avatarGroupContext?.isGrid && !!avatarGroupContext && '-ms-2',
        className
      )}
    >
      <UiAvatar
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        isDisabled={isDisabled}
        size={size}
        radius={radius}
        isBordered={isBordered}
        className={cn(
          !avatarGroupContext?.isGrid &&
            !!avatarGroupContext &&
            'group-hover:-translate-y-3.5',
          'transition-transform duration-300 ease-in-out',
          'bg-slate-100',
          'flex items-center justify-center',
          'relative',
          'z-10',
          'overflow-hidden',
          isDisabled ? 'opacity-50' : 'opacity-100',
          [
            size === 'sm' && 'h-8',
            size === 'md' && 'h-10',
            size === 'lg' && 'h-12',
            size === 'sm' && 'w-8',
            size === 'md' && 'w-10',
            size === 'lg' && 'w-12',
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
          classNames?.base
        )}
        classNames={{
          icon: cn(
            'data-[loaded=true]:opacity-100 opacity-0',
            'absolute',
            'w-full',
            'h-full',
            'overflow-hidden',
            'object-cover',
            'object-center',
            'transition-opacity ease-in-out duration-500',
            classNames?.icon
          ),
          name: cn(
            'flex items-center justify-center',
            'absolute top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'text-xs text-center',
            'max-w-full',
            'overflow-hidden',
            classNames?.name
          ),
          fallback: cn(
            'flex items-center justify-center',
            'absolute top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'text-xs text-center',
            'max-w-full',
            'overflow-hidden',
            classNames?.fallback
          ),
        }}
        icon={
          icon || (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        }
      />
    </div>
  );
}

export default Avatar;
