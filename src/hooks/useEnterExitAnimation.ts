import { useEffect, useState } from 'react';

export const useEnterExitAnimation = (isOpen: boolean) => {
  const [isEntering, setIsEntering] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Reset animation states immediately, then trigger after a frame.
    // This pattern is intentional for enter/exit animations.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- animation reset pattern
    setIsEntering(false);

    setIsExiting(false);

    const timeoutId = setTimeout(() => {
      if (isOpen) {
        setIsEntering(true);
      } else {
        setIsExiting(true);
      }
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  return { isEntering, isExiting };
};

export default useEnterExitAnimation;
