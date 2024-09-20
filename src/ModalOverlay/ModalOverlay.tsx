import {
  forwardRef,
  Ref,
  ReactNode,
  Key,
  useId,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  ModalOverlayProps as UiModalOverlayProps,
  ModalOverlay as UIModalOverlay,
  ModalRenderProps,
} from 'react-aria-components';
import { motion, MotionStyle, Variant, AnimatePresence } from 'framer-motion';
import {
  useDialogTrigger,
  DriverAnimationState,
} from '../DialogTrigger/DialogTrigger';
import { cn } from '../utils';

export interface ModalOverlayProps
  extends Omit<UiModalOverlayProps, 'children' | 'style'> {
  key?: Key;
  style?: MotionStyle;
  animationVariants?: { visible: Variant; hidden: Variant };
  children:
    | ReactNode
    | ((
        values: ModalRenderProps & { defaultChildren: ReactNode }
      ) => ReactNode);
}

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

  return (
    <MotionModalOverlay
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      key={id}
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

InnerModalOverlay.defaultProps = {
  key: undefined,
  style: undefined,
  animationVariants: undefined,
};

ModalOverlay.defaultProps = {
  key: undefined,
  style: undefined,
  animationVariants: undefined,
};

export default ModalOverlay;
