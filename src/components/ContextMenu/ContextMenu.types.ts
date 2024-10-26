import type { PopoverProps as AriaPopoverProps } from 'react-aria-components';
import type { Dispatch, Key, SetStateAction, ReactNode } from 'react';
import type { MotionStyle } from 'framer-motion';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

type ContextMenuAnimationState = 'unmounted' | 'hidden' | 'visible';

export interface PopoverProps
  extends Omit<AriaPopoverProps, 'children' | 'style'> {
  animation: ContextMenuAnimationState;
  children: ReactNode;
  onAction?: (key: Key) => void;
  setAnimation: Dispatch<SetStateAction<ContextMenuAnimationState>>;
  key?: Key | null;
  classNames?: SlotsToClasses<'menu'>;
  style?: MotionStyle;
}
