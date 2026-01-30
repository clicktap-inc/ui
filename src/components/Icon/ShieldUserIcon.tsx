'use client';

import { cn } from '../../utils/cn';

export interface ShieldUserIconProps {
  className?: string;
  size?: number;
}

/** Shield user icon (shield with user) for role-related UI */
export function ShieldUserIcon({ className, size = 16 }: ShieldUserIconProps) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <circle cx="12" cy="11" r="2" />
      <path d="M16 16c0-1.7-1.3-3-4-3s-4 1.3-4 3" />
    </svg>
  );
}

export default ShieldUserIcon;
