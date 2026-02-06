'use client';

import { forwardRef, useId } from 'react';
import type { Dispatch, ReactNode, Ref, SetStateAction } from 'react';
import { ModalOverlay as UIModalOverlay } from 'react-aria-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useDialogTrigger } from '../DialogTrigger/DialogTrigger';
/** @todo this probably belongs in Modal instead of DialogTrigger */
import type { DriverAnimationState } from '../DialogTrigger/DialogTrigger.types';
import { cn } from '../../utils/cn';
import type { ModalOverlayProps } from './ModalOverlay.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForwardedModalOverlay = forwardRef<HTMLDivElement, any>(
  ({ style, children, ...props }, ref: Ref<HTMLDivElement>) => {
    // Separate the dynamic style logic
    const ariaStyle = typeof style === 'function' ? style(props) : style;

    return (
      // Pass only static styles to framer-motion
      // Children must be explicitly rendered - spreading props doesn't render them as JSX children
      <UIModalOverlay {...props} ref={ref} style={ariaStyle}>
        {children}
      </UIModalOverlay>
    );
  },
);

// Lazy-initialized motion component for SSR compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MotionModalOverlay: any = null;

function getMotionModalOverlay() {
  if (typeof window === 'undefined') return null;
  if (!MotionModalOverlay) {
    MotionModalOverlay = motion.create(ForwardedModalOverlay);
  }

  return MotionModalOverlay;
}

const Motion = getMotionModalOverlay();

function InnerModalOverlay({
  animate,
  animation,
  setAnimation,
  className,
  animationVariants,
  children,
  ...props
}: ModalOverlayProps & {
  animate: string;
  animation: string;
  setAnimation: Dispatch<SetStateAction<DriverAnimationState>>;
}) {
  const id = useId();

  // extract key from props to avoid spreading it
  const { key, ...restProps } = props;

  const commonProps = {
    className: cn(
      'bg-black/30',
      'fixed top-0 left-0',
      'z-[1000]',
      'w-screen h-[var(--visual-viewport-height)]',
      className,
    ),
    ...restProps,
  };

  // SSR fallback - render without animation
  if (!Motion) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <UIModalOverlay {...(commonProps as any)}>
        {children as ReactNode}
      </UIModalOverlay>
    );
  }

  return (
    <Motion
      key={key || id}
      isExiting={animation === 'hidden'}
      onAnimationComplete={(currentAnimation: DriverAnimationState) => {
        setAnimation((a) =>
          currentAnimation === 'hidden' && a === 'hidden' ? 'unmounted' : a,
        );
      }}
      variants={
        animationVariants || {
          hidden: {
            opacity: 0,
            backdropFilter: 'blur(0px)',
            transition: {
              delay: 0.08,
            },
          },
          visible: {
            opacity: 1,
            backdropFilter: 'blur(8px)',
          },
        }
      }
      initial="hidden"
      animate={animate}
      exit="hidden"
      {...commonProps}
    >
      {children as ReactNode}
    </Motion>
  );
}

export function ModalOverlay(props: ModalOverlayProps) {
  const { isOpen } = props;
  const { animation, setAnimation } = useDialogTrigger();

  if (isOpen !== undefined) {
    return (
      <AnimatePresence>
        {isOpen && (
          <InnerModalOverlay
            {...props}
            animate="visible"
            animation={animation}
            setAnimation={setAnimation}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <InnerModalOverlay
      {...props}
      animate={animation}
      animation={animation}
      setAnimation={setAnimation}
    />
  );
}

export default ModalOverlay;
