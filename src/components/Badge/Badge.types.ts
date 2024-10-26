import type { BadgeProps as NextBadgeProps } from '@nextui-org/badge';

export type BadgeProps = Omit<NextBadgeProps, 'color | disableOutline'>;
