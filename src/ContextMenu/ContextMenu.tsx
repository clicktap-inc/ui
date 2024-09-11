import {
  Menu,
  PopoverProps as AriaPopoverProps,
  Popover,
} from 'react-aria-components';
import { Dispatch, Key, SetStateAction, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import type { SlotsToClasses } from '../types';

export type ContextMenuAnimationState = 'unmounted' | 'hidden' | 'visible';

interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
  animation: ContextMenuAnimationState;
  children: ReactNode;
  onAction?: (key: Key) => void;
  setAnimation: Dispatch<SetStateAction<ContextMenuAnimationState>>;
  key?: Key | null;
  classNames?: SlotsToClasses<'menu'>;
}

const StyledPopover = motion(Popover);

export function ContextMenu({
  children,
  key,
  onAction,
  setAnimation,
  animation = 'hidden',
  className,
  classNames,
  ...props
}: PopoverProps) {
  return (
    <StyledPopover
      className={cn(
        'px-0 py-1.5',
        'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
        'rounded-md',
        'w-56',
        'bg-white',
        'border border-solid border-slate-300',
        className
      )}
      key={key}
      isExiting={animation === 'hidden'}
      onAnimationComplete={(completedAnimation: string) => {
        setAnimation((a) =>
          completedAnimation === 'hidden' && a === 'hidden' ? 'unmounted' : a
        );
      }}
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={animation}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Menu
        className={cn('outline-none', classNames?.menu)}
        onAction={onAction}
      >
        {children}
      </Menu>
    </StyledPopover>
  );
}

ContextMenu.defaultProps = {
  key: undefined,
  onAction: undefined,
  classNames: undefined,
};

export default ContextMenu;
