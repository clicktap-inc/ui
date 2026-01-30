'use client';

import { cn } from '../../utils/cn';

export interface ResetPasswordIconProps {
  className?: string;
  size?: number;
}

/** Reset password icon (key with refresh) */
export function ResetPasswordIcon({
  className,
  size = 16,
}: ResetPasswordIconProps) {
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
      <path d="m14.5 9.5 1 1" />
      <path d="m15.5 8.5-4 4" />
      <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <circle cx="10" cy="14" r="2" />
    </svg>
  );
}

export default ResetPasswordIcon;
