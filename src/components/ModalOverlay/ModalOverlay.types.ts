import type { Key, ReactNode } from 'react';
import type {
  ModalOverlayProps as UiModalOverlayProps,
  ModalRenderProps,
} from 'react-aria-components';
import type { MotionStyle, Variant } from 'framer-motion';

export interface ModalOverlayProps
  extends Omit<UiModalOverlayProps, 'children' | 'style' | 'onAnimationStart'> {
  key?: Key;
  style?: MotionStyle;
  animationVariants?: { visible: Variant; hidden: Variant };
  children:
    | ReactNode
    | ((
        values: ModalRenderProps & { defaultChildren: ReactNode }
      ) => ReactNode);
}
