'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { cn } from '../../utils/cn';
import type { CircularEasingProps } from './CircularEasing.types';

export function CircularEasing({
  width,
  stroke,
  strokeLinecap = 'round',
  strokeWidth = 5,
  className,
  style,
  ...props
}: CircularEasingProps) {
  return (
    <div
      style={{ '--circularWidth': `${width}px`, ...style } as CSSProperties}
      {...props}
      className={cn(
        'relative',
        'm-0',
        'w-[--circularWidth]',
        'aspect-square',
        className
      )}
    >
      <motion.svg
        animate={{
          transform: 'rotate(360deg)',
          transition: { repeat: Infinity, duration: 2, ease: 'linear' },
        }}
        viewBox="25 25 50 50"
        className={cn(
          'w-full h-full',
          'absolute inset-x-0 inset-y-0',
          'origin-center',
          'm-auto'
        )}
      >
        <motion.circle
          animate={{
            strokeDasharray: ['1, 200', '89, 200', '89, 200'],
            strokeDashoffset: [0, -35, -124],
            transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
          }}
          className="path"
          cx="50"
          cy="50"
          fill="none"
          r="20"
          strokeDasharray="1, 200"
          strokeDashoffset="0"
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
      </motion.svg>
    </div>
  );
}

export default CircularEasing;
