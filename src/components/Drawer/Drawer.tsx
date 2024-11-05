'use client';

import { forwardRef } from 'react';
import type { Ref, ReactNode, CSSProperties } from 'react';
import { Dialog } from 'react-aria-components';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { DrawerProps } from './Drawer.types';

const directionAnimatation = {
  top: {
    hidden: {
      y: '-100%',
      transition: {
        ease: 'easeIn',
      },
    },
    visible: {
      y: 0,
      transition: {
        ease: 'easeOut',
      },
    },
  },
  bottom: {
    hidden: {
      y: '100%',
      transition: {
        ease: 'easeIn',
      },
    },
    visible: {
      y: 0,
      transition: {
        ease: 'easeOut',
      },
    },
  },
  right: {
    hidden: {
      x: '100%',
      transition: {
        ease: 'easeIn',
      },
    },
    visible: {
      x: 0,
      transition: {
        ease: 'easeOut',
      },
    },
  },
  left: {
    hidden: {
      x: '-100%',
      transition: {
        ease: 'easeIn',
      },
    },
    visible: {
      x: 0,
      transition: {
        ease: 'easeOut',
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForwardedDialog = forwardRef<HTMLElement, any>(
  ({ style, size = '20rem', ...props }, ref: Ref<HTMLElement>) => {
    // Separate the dynamic style logic
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ariaStyle =
      typeof style === 'function'
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          style(props)
        : ({
            ...style,
            '--drawer-size': `${size as string}`,
          } as CSSProperties);

    return (
      // Pass only static styles to framer-motion
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/jsx-props-no-spreading
      <Dialog {...props} ref={ref} style={ariaStyle} />
    );
  }
);

const MotionDrawer = motion.create(ForwardedDialog);

export function Drawer({
  direction = 'right',
  children,
  className,
  animationVariants,
  ...props
}: DrawerProps) {
  return (
    <MotionDrawer
      className={cn(
        'fixed p-8 outline-0 bg-white',
        'border-solid border-slate-200',
        'max-w-full max-h-[var(--visual-viewport-height)]',
        direction === 'top' &&
          'top-0 left-0 right-0 bottom-auto border-b shadow-[0_8px_24px_rgba(0,0,0,0.1)] h-[var(--drawer-size)]',
        direction === 'right' &&
          'top-0 left-auto bottom-0 right-0 border-l shadow-[-8px_0_24px_rgba(0,0,0,0.1)] w-[var(--drawer-size)]',
        direction === 'bottom' &&
          'bottom-0 left-0 right-0 top-auto border-t shadow-[0_-8px_24px_rgba(0,0,0,0.1)] h-[var(--drawer-size)]',
        direction === 'left' &&
          'top-0 bottom-0 left-0 right-auto border-r shadow-[8px_0_24px_rgba(0,0,0,0.1)] w-[var(--drawer-size)]',
        className
      )}
      data-direction={direction}
      variants={animationVariants || directionAnimatation[direction]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children as ReactNode}
    </MotionDrawer>
  );
}

export default Drawer;
