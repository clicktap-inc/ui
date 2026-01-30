'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export interface IncludedIconProps extends IconProps {
  size?: number;
}

/**
 * Icon indicating a permission is already included/provided.
 * Used to show that a permission is active through the product or baseline,
 * even though it hasn't been directly assigned.
 */
export function IncludedIcon({
  className,
  size = 16,
  style,
}: IncludedIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('flex-shrink-0', className)}
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default IncludedIcon;
