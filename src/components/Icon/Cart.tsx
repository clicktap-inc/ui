'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export function Cart({ className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn(className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <path
        d="M5 1.66797L2.5 5.0013V16.668C2.5 17.11 2.67559 17.5339 2.98816 17.8465C3.30072 18.159 3.72464 18.3346 4.16667 18.3346H15.8333C16.2754 18.3346 16.6993 18.159 17.0118 17.8465C17.3244 17.5339 17.5 17.11 17.5 16.668V5.0013L15 1.66797H5Z"
        stroke="#20293A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 5H17.5"
        stroke="#20293A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3334 8.33203C13.3334 9.21609 12.9822 10.0639 12.3571 10.6891C11.732 11.3142 10.8841 11.6654 10.0001 11.6654C9.11603 11.6654 8.26818 11.3142 7.64306 10.6891C7.01794 10.0639 6.66675 9.21609 6.66675 8.33203"
        stroke="#20293A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Cart;
