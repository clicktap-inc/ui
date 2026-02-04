'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { PulseProps } from './Pulse.types';

export function Pulse({ classNames }: PulseProps) {
  return (
    <span className={cn(classNames?.base)}>
      {Array.from(new Array(3)).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [1, 1, 0.7, 1, 1],
            transform: [
              'scale(1)',
              'scale(1)',
              'scale(0.1)',
              'scale(1)',
              'scale(1)',
            ],
            transition: {
              repeat: Infinity,
              duration: 0.75,
              delay: i * 0.1,
              // ease: [0.2, 0.68, 0.18, 1.08],
            },
          }}
          className={cn(
            'bg-slate-300',
            'inline-block',
            'w-2',
            'h-2',
            'm-0.5',
            'rounded-lg',
            classNames?.dot,
          )}
        />
      ))}
    </span>
  );
}

export default Pulse;
