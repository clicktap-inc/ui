import type { AvatarGroupProps as NextAvatarGroupProps } from '@nextui-org/avatar';

export type AvatarGroupProps = Pick<
  NextAvatarGroupProps,
  'isGrid' | 'renderCount'
> & {
  className?: string;
};
