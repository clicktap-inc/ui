'use client';

import { cn } from '../../utils/cn';

export interface InvoiceIconProps {
  className?: string;
  size?: number;
}

/** Invoice icon (credit card) */
export function InvoiceIcon({ className, size = 16 }: InvoiceIconProps) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

export default InvoiceIcon;
