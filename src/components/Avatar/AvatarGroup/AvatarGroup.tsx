'use client';

import type { PropsWithChildren } from 'react';
import { cn } from '../../../utils/cn';
import type { AvatarGroupProps } from './AvatarGroup.types';

/**
 * SSR-compatible AvatarGroup component.
 * Pure Tailwind implementation that works with Next.js App Router SSR.
 */
export function AvatarGroup({
  children,
  isGrid,
  className,
}: PropsWithChildren<AvatarGroupProps>) {
  return (
    <div
      className={cn(
        isGrid ? 'inline-grid' : 'flex',
        isGrid ? 'gap-3' : 'gap-0',
        'grid-cols-4',
        'items-center',
        className
      )}
    >
      {children}
    </div>
  );
}

export default AvatarGroup;
