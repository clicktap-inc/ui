'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export interface StarIconProps extends IconProps {
  size?: number;
  /** Whether to render the filled (active) variant. Defaults to outline. */
  filled?: boolean;
}

/** Star icon — outline by default, filled when `filled` is true. */
export function StarIcon({
  className,
  size = 16,
  style,
  filled = false,
}: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(filled ? 'text-amber-400' : 'text-slate-400', className)}
      style={style}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export default StarIcon;
