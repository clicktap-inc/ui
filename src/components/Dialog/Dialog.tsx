'use client';

import { forwardRef } from 'react';
import type { Ref, ReactNode } from 'react';
import { Dialog as AriaDialog } from 'react-aria-components';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { DialogProps } from './Dialog.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForwardedDialog = forwardRef<HTMLElement, any>(
  ({ style, animationVariants, ...props }, ref: Ref<HTMLElement>) => {
    // Separate the dynamic style logic
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const ariaStyle = typeof style === 'function' ? style(props) : style;

    return (
      // Pass only static styles to framer-motion
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/jsx-props-no-spreading
      <AriaDialog {...props} ref={ref} style={ariaStyle} />
    );
  }
);

const MotionDialog = motion.create(ForwardedDialog);

export function Dialog({
  className,
  children,
  animationVariants,
  ...props
}: DialogProps) {
  return (
    <MotionDialog
      className={cn(
        'p-8 outline-0 max-w-max w-screen absolute top-2/4 left-2/4',
        'shadow-[0_8px_24px_rgba(0,0,0,0.1)] rounded-lg bg-white border border-solid border-slate-400',
        'transform -translate-x-1/2 -translate-y-1/2',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      variants={
        animationVariants || {
          hidden: {
            transform: 'translate(-50%, -50%) scale(0.8)',
            transition: {
              ease: 'backIn',
            },
          },
          visible: {
            transform: 'translate(-50%, -50%) scale(1)',
            transition: {
              ease: 'backOut',
            },
          },
        }
      }
    >
      {children as ReactNode}
    </MotionDialog>
  );
}

export default Dialog;
