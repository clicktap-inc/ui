import type { AvatarProps as NextAvatarProps } from '@nextui-org/avatar';

export type AvatarProps = Omit<NextAvatarProps, 'color'>;
