import { AvatarProps as NextAvatarProps } from '@nextui-org/avatar';

export type AvatarProps = Omit<NextAvatarProps, 'color'>;

export interface RootProps {
  isInGroup: boolean;
  isGrid: boolean;
}
