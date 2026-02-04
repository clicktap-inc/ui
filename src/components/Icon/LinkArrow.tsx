'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export function LinkArrow({ className, ...rest }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'text-inherit transition duration-100 ease-linear',
        className,
      )}
      {...rest}
    >
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="#20293A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LinkArrow;
