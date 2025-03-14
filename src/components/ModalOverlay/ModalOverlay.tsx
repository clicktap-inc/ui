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
const ForwardedModalOverlay = forwardRef<HTMLElement, any>(
  ({ style, ...props }, ref: Ref<HTMLElement>) => {
    // Separate the dynamic style logic
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const ariaStyle = typeof style === 'function' ? style(props) : style;

    return (
      // Pass only static styles to framer-motion
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/jsx-props-no-spreading
      <UIModalOverlay {...props} ref={ref} style={ariaStyle} />
    );
  }
);

const MotionModalOverlay = motion.create(ForwardedModalOverlay);

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

  return (
    <MotionModalOverlay
      key={key || id}
      isExiting={animation === 'hidden'}
      onAnimationComplete={(currentAnimation: DriverAnimationState) => {
        setAnimation((a) =>
          currentAnimation === 'hidden' && a === 'hidden' ? 'unmounted' : a
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
      className={cn(
        'bg-black/30',
        'fixed top-0 left-0',
        'z-50',
        'w-screen h-[var(--visual-viewport-height)]',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {children as ReactNode}
    </MotionModalOverlay>
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
            // eslint-disable-next-line react/jsx-props-no-spreading
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      animate={animation}
      animation={animation}
      setAnimation={setAnimation}
    />
  );
}

export default ModalOverlay;
