'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export interface LockIconProps extends IconProps {
  size?: number;
}

/** Lock icon for permission-restricted features (from Lucide) */
export function LockIcon({ className, size = 24, style }: LockIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-yellow-500', className)}
      style={style}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default LockIcon;
