import { Transition } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { TransitionConfig } from '../NumberTicker.types';

export const useColumnTransition = ({
  skipFirstAnimation = true,
  transition: transitionProps,
}: TransitionConfig) => {
  const [firstAnimation, setFirstAnimation] = useState(skipFirstAnimation);

  const transition = useMemo<Transition>(() => {
    return firstAnimation
      ? {
          duration: 0.1,
        }
      : {
          ...(transitionProps || {
            type: 'spring',
            stiffness: 50,
          }),
        };
  }, [firstAnimation, transitionProps]);

  const updateTransition = useCallback(() => {
    if (skipFirstAnimation) {
      setFirstAnimation(false);
    }
  }, [skipFirstAnimation]);

  return {
    transition,
    updateTransition,
  };
};

export default useColumnTransition;
