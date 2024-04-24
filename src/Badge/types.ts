import { BadgeProps as NextBadgeProps } from '@nextui-org/badge';

export type BadgeProps = Omit<NextBadgeProps, 'color | disableOutline'>;

export type BadgeWrapperProps = Pick<BadgeProps, 'placement' | 'shape'>;
