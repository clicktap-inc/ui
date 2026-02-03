'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export function DownArrow({ className, ...rest }: IconProps) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...rest}
    >
      <path d="M13 0.5L7 6.5L1 0.499999" stroke="currentColor" />
    </svg>
  );
}

export default DownArrow;
