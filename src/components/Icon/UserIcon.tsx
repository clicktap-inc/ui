'use client';

import { cn } from '../../utils/cn';

export interface UserIconProps {
  className?: string;
  size?: number;
}

/** User icon (from Lucide) */
export function UserIcon({ className, size = 16 }: UserIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-ffl-gray-500 flex-shrink-0', className)}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default UserIcon;
