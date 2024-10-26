'use client';

import { Menu, Popover } from 'react-aria-components';
import { forwardRef } from 'react';
import type { Ref } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { PopoverProps } from './ContextMenu.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForwardedPopover = forwardRef<HTMLElement, any>(
  ({ style, ...props }, ref: Ref<HTMLElement>) => {
    // Separate the dynamic style logic
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const ariaStyle = typeof style === 'function' ? style(props) : style;

    return (
      // Pass only static styles to framer-motion
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/jsx-props-no-spreading
      <Popover {...props} ref={ref} style={ariaStyle} />
    );
  }
);

const MotionPopover = motion.create(ForwardedPopover);

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
    <MotionPopover
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
    </MotionPopover>
  );
}

ContextMenu.defaultProps = {
  key: undefined,
  onAction: undefined,
  classNames: undefined,
  style: undefined,
};

export default ContextMenu;
