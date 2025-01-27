'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export function Cross({ className, ...rest }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <path
        d="M12 4L4 12"
        stroke="#20293A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L12 12"
        stroke="#20293A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Cross;
