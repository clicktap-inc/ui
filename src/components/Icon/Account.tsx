'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export function Account({ className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn(className)}
      {...rest}
    >
      <g clipPath="url(#clip0_283_14902)">
        <path
          d="M15 16.668C15 15.3419 14.4732 14.0701 13.5355 13.1324C12.5979 12.1948 11.3261 11.668 10 11.668C8.67392 11.668 7.40215 12.1948 6.46447 13.1324C5.52678 14.0701 5 15.3419 5 16.668"
          stroke="#20293A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99996 11.6667C11.8409 11.6667 13.3333 10.1743 13.3333 8.33333C13.3333 6.49238 11.8409 5 9.99996 5C8.15901 5 6.66663 6.49238 6.66663 8.33333C6.66663 10.1743 8.15901 11.6667 9.99996 11.6667Z"
          stroke="#20293A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0001 18.3346C14.6025 18.3346 18.3334 14.6037 18.3334 10.0013C18.3334 5.39893 14.6025 1.66797 10.0001 1.66797C5.39771 1.66797 1.66675 5.39893 1.66675 10.0013C1.66675 14.6037 5.39771 18.3346 10.0001 18.3346Z"
          stroke="#20293A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_283_14902">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Account;
