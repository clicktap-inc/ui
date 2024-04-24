import { AnimatePresence, motion } from 'framer-motion';
import { useId } from 'react';
import { BadgeProps } from './types';
import { Root, BadgeWrapper, StyledBadge } from './styles';

const animationVariants = {
  hidden: {
    opacity: 0,
    transform: 'scale(0)',
  },
  show: {
    opacity: 1,
    transform: 'scale(1)',
  },
};

export function Badge({
  children,
  isInvisible,
  disableAnimation,
  placement,
  shape,
  ...props
}: BadgeProps) {
  const id = useId();
  const transition = disableAnimation
    ? { duration: 0 }
    : { type: 'spring', bounce: 0.3 };

  return (
    <Root>
      {children}
      <BadgeWrapper placement={placement} shape={shape}>
        <AnimatePresence>
          {!isInvisible && (
            <motion.div
              key={`badge-${id}`}
              variants={animationVariants}
              initial={disableAnimation ? 'show' : 'hidden'}
              transition={transition}
              animate="show"
              exit="hidden"
            >
              <StyledBadge
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                isInvisible={isInvisible}
                showOutline={props.showOutline ?? true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </BadgeWrapper>
    </Root>
  );
}

export default Badge;
