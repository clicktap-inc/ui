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

    const ariaStyle = typeof style === 'function' ? style(props) : style;

    return (
      // Pass only static styles to framer-motion

      <Popover {...props} ref={ref} style={ariaStyle} />
    );
  }
);

// Lazy-initialized motion component for SSR compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MotionPopover: any = null;

function getMotionPopover() {
  if (typeof window === 'undefined') return null;
  if (!MotionPopover) {
    MotionPopover = motion.create(ForwardedPopover);
  }

  return MotionPopover;
}

// Initialize motion component at module level to avoid creating during render
const Motion = getMotionPopover();

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
  const popoverClassName = cn(
    'px-0 py-1.5',
    'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
    'rounded-md',
    'w-56',
    'bg-white',
    'border border-solid border-slate-300',
    className
  );

  // SSR fallback - render without animation
  if (!Motion) {
    return (
      <ForwardedPopover className={popoverClassName} key={key} {...props}>
        <Menu
          className={cn('outline-none', classNames?.menu)}
          onAction={onAction}
        >
          {children}
        </Menu>
      </ForwardedPopover>
    );
  }

  return (
    <Motion
      className={popoverClassName}
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
      {...props}
    >
      <Menu
        className={cn('outline-none', classNames?.menu)}
        onAction={onAction}
      >
        {children}
      </Menu>
    </Motion>
  );
}

export default ContextMenu;
