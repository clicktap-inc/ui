'use client';

import { AvatarGroup as UIAvatarGroup } from '@nextui-org/avatar';
import type { PropsWithChildren } from 'react';
import { cn } from '../../../utils/cn';
import type { AvatarGroupProps } from './AvatarGroup.types';

export function AvatarGroup({
  children,
  isGrid,
  renderCount,
  className,
}: PropsWithChildren<AvatarGroupProps>) {
  return (
    <UIAvatarGroup
      isGrid={isGrid}
      max={0}
      renderCount={renderCount ?? undefined}
      className={cn(
        isGrid ? 'inline-grid' : 'flex',
        isGrid ? 'gap-3' : 'gap-0',
        'grid-cols-4',
        'items-center',
        className
      )}
    >
      {children}
    </UIAvatarGroup>
  );
}

export default AvatarGroup;
