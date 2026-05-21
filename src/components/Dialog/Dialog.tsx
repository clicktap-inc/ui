'use client';

import { forwardRef } from 'react';
import type { Ref, ReactNode } from 'react';
import { Dialog as AriaDialog } from 'react-aria-components';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { DialogProps } from './Dialog.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForwardedDialog = forwardRef<HTMLElement, any>(
  (
    { style, animationVariants: _animationVariants, ...props },
    ref: Ref<HTMLElement>,
  ) => {
    // Separate the dynamic style logic

    const ariaStyle = typeof style === 'function' ? style(props) : style;

    return (
      // Pass only static styles to framer-motion

      <AriaDialog {...props} ref={ref} style={ariaStyle} />
    );
  },
);

// Lazy-initialized motion component for SSR compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MotionDialog: any = null;

function getMotionDialog() {
  if (typeof window === 'undefined') return null;
  if (!MotionDialog) {
    MotionDialog = motion.create(ForwardedDialog);
  }

  return MotionDialog;
}

// Initialize motion component at module level to avoid creating during render
const Motion = getMotionDialog();

export function Dialog({
  className,
  children,
  animationVariants,
  ...props
}: DialogProps) {
  const commonProps = {
    className: cn(
      'p-8 outline-0 max-w-max w-screen absolute top-2/4 left-2/4',
      // Centering uses static Tailwind classes (NOT framer-motion `x`/`y`
      // variants). framer-motion 11.x's keyframe resolver can crash
      // inside `mixObject` (complex.mjs:48) when transform-related
      // primitives are batched alongside another animating component.
      // Sticking to opacity-only variants below keeps WAAPI off the
      // complex-value path entirely.
      '-translate-x-1/2 -translate-y-1/2',
      'shadow-[0_8px_24px_rgba(0,0,0,0.1)] rounded-lg bg-white border border-solid border-slate-400',
      className,
    ),
    ...props,
  };

  // SSR fallback - render without animation
  if (!Motion) {
    return (
      <ForwardedDialog {...commonProps}>
        {children as ReactNode}
      </ForwardedDialog>
    );
  }

  return (
    <Motion
      {...commonProps}
      variants={
        animationVariants || {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      }
    >
      {children as ReactNode}
    </Motion>
  );
}

export default Dialog;
