'use client';

import { forwardRef, useCallback, useContext, useEffect, useId } from 'react';
import type {
  Dispatch,
  PointerEvent,
  ReactNode,
  Ref,
  SetStateAction,
} from 'react';
import {
  ModalOverlay as UIModalOverlay,
  OverlayTriggerStateContext,
} from 'react-aria-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useDialogTrigger } from '../DialogTrigger/DialogTrigger';
/** @todo this probably belongs in Modal instead of DialogTrigger */
import type { DriverAnimationState } from '../DialogTrigger/DialogTrigger.types';
import { cn } from '../../utils/cn';
import type { ModalOverlayProps } from './ModalOverlay.types';

/**
 * react-aria marks every sibling of the overlay container as `inert` while
 * a modal is open.  The only element that should stay inert is `#__next`
 * (page content behind the modal).  Everything else at the body level —
 * browser extension UI (1Password, LastPass, Bitwarden, etc.) — gets
 * incorrectly blocked.  We strip `inert` from those non-app elements so
 * extensions keep working.
 */
const NON_APP_INERT_SELECTOR =
  'body > [inert]:not(#__next):not([data-overlay-container])';

/**
 * Check whether a DOM element is managed by React.
 * React attaches __reactFiber$... and __reactProps$... properties to every
 * DOM element it manages.  Extension-injected elements won't have these.
 */
function isReactElement(el: Element): boolean {
  return Object.keys(el).some((key) => key.startsWith('__react'));
}

function removeInertFromNonAppElements() {
  // Fast path: direct body children that aren't the app or overlay container
  document
    .querySelectorAll(NON_APP_INERT_SELECTOR)
    .forEach((el) => el.removeAttribute('inert'));
}

/**
 * Check whether the element belongs to the page (not a browser extension).
 * Extension-injected elements sit outside both the React tree and the
 * react-aria overlay container.  Clicks on them should not dismiss the
 * modal.
 */
function isPageElement(element: Element): boolean {
  return !!(
    element.closest('[data-overlay-container]') || element.closest('#__next')
  );
}

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
  isDismissable = true,
  children,
  ...props
}: ModalOverlayProps & {
  animate: string;
  animation: string;
  setAnimation: Dispatch<SetStateAction<DriverAnimationState>>;
}) {
  const id = useId();

  // Strip `inert` from non-app elements (browser extensions) that
  // react-aria incorrectly marks as inert when the modal opens.
  useEffect(() => {
    removeInertFromNonAppElements();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'inert'
        ) {
          const el = mutation.target as Element;
          // Body-level non-app elements (fast path)
          if (el.parentElement === document.body) {
            removeInertFromNonAppElements();
          } else if (!isReactElement(el)) {
            // Deeper elements without React fiber = extension-injected
            el.removeAttribute('inert');
          }
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['inert'],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // extract key and shouldCloseOnInteractOutside from props to avoid
  // spreading them (we handle shouldCloseOnInteractOutside below)
  const {
    key,
    shouldCloseOnInteractOutside: propShouldClose,
    onOpenChange,
    ...restProps
  } = props;

  const shouldCloseOnInteractOutside = useCallback(
    (element: Element) => {
      if (propShouldClose) {
        return propShouldClose(element);
      }
      return isPageElement(element);
    },
    [propShouldClose],
  );

  // react-aria's overlay state from context (populated when this overlay is
  // rendered inside a <DialogTrigger>). This is how we actually close in the
  // common, DialogTrigger-managed case where no `onOpenChange` prop is passed.
  const overlayState = useContext(OverlayTriggerStateContext);

  // react-aria's useInteractOutside checks clicks outside the overlay ref,
  // but since the overlay covers the viewport, backdrop clicks are "inside"
  // and never trigger dismiss. Handle backdrop clicks explicitly: prefer the
  // controlled `onOpenChange` prop, else close via the react-aria overlay
  // state from <DialogTrigger> (the standard usage app-wide — without this,
  // backdrop click-away does nothing and only Escape closes the modal).
  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDismissable || e.target !== e.currentTarget) {
        return;
      }
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        overlayState?.close();
      }
    },
    [isDismissable, onOpenChange, overlayState],
  );

  const commonProps = {
    isDismissable,
    shouldCloseOnInteractOutside,
    onOpenChange,
    onPointerDown: handlePointerDown,
    className: cn(
      // backdrop-blur is applied here as a static class instead of in framer-motion
      // variants because WAAPI cannot interpolate backdropFilter — see variants comment
      'bg-black/30 backdrop-blur-sm',
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
      // Opacity-only variants. framer-motion 11.x's keyframe resolver
      // crashes inside `mixObject` (complex.mjs:48) on a wide range of
      // values: `backdropFilter`, multi-function `transform` strings,
      // and even `pointerEvents` when batched alongside other
      // unresolved keyframes. Keeping variants on a single primitive
      // (`opacity`) routes WAAPI through its safe path.
      //
      // The backdrop blur stays on the CSS class (`backdrop-blur-sm`
      // above). The non-blocking-while-hidden behavior moves to a
      // conditional CSS class (`pointer-events-none` when collapsed,
      // applied unconditionally here because the overlay only blocks
      // when fully visible anyway).
      variants={
        animationVariants || {
          hidden: { opacity: 0, transition: { delay: 0.08 } },
          visible: { opacity: 1 },
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
