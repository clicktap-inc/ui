import { useEffect, useState } from 'react';
// import { flushSync } from 'react-dom';

export const useEnterExitAnimation = (isOpen: boolean) => {
  const [isEntering, setIsEntering] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsEntering(false);
    setIsExiting(false);

    setTimeout(() => {
      if (isOpen) {
        setIsEntering(true);
      } else {
        setIsExiting(true);
      }
    }, 10);
  }, [isOpen]);

  return { isEntering, isExiting };
};

export default useEnterExitAnimation;
