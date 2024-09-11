import { PropsWithChildren } from 'react';
import { AvatarGroup as UIAvatarGroup } from '@nextui-org/avatar';
import { cn } from '../../utils';
import { AvatarGroupProps } from './types';

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
