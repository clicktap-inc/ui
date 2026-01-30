'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export interface NoEntryIconProps extends IconProps {
  size?: number;
}

/** No entry/ban icon for access denied states (from Lucide) */
export function NoEntryIcon({ className, size = 24, style }: NoEntryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-red-500', className)}
      style={style}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );
}

export default NoEntryIcon;
