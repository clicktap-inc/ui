import type { Key } from 'react';
import type { DialogProps as UIDialogProps } from 'react-aria-components';
import { MotionStyle, Variants } from 'framer-motion';

export type DialogProps = Omit<UIDialogProps, 'onAnimationStart'> & {
  key?: Key;
  style?: MotionStyle;
  animationVariants?: Variants;
};
