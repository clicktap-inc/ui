'use client';

import { cn } from '../../utils/cn';

export interface ArrowLeftIconProps {
  className?: string;
  size?: number;
}

/** Arrow left icon for back navigation */
export function ArrowLeftIcon({ className, size = 16 }: ArrowLeftIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8L2 12L6 16" />
      <path d="M2 12H22" />
    </svg>
  );
}

export default ArrowLeftIcon;
