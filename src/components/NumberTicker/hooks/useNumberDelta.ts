import { useRef, useEffect } from 'react';

export const useNumberDelta = (value = 0) => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  switch (true) {
    case value > ref.current:
      return 'increase';
    case value < ref.current:
      return 'decrease';
    default:
      return 'same';
  }
};

export default useNumberDelta;
