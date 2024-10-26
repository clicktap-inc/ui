import type { Key } from 'react';
import type { DialogProps } from 'react-aria-components';
import type { MotionStyle, Variants } from 'framer-motion';

export type DrawerProps = DialogProps & {
  direction?: 'top' | 'right' | 'bottom' | 'left';
  key?: Key;
  style?: MotionStyle;
  animationVariants?: Variants;
  size?: string;
};
