'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export interface GemIconProps extends IconProps {
  size?: number;
}

/** Gem icon for premium/upgrade features (from Lucide) */
export function GemIcon({ className, size = 24, style }: GemIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-purple-500', className)}
      style={style}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}

export default GemIcon;
