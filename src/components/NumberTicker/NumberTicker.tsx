'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { NumberTickerProps } from './NumberTicker.types';
import { useNumberDelta } from './hooks/useNumberDelta';
import { useNumberTicker } from './hooks/useNumberTicker';
import { DigitResolver } from './DigitResolver';

export function NumberTicker({
  value,
  asLocal,
  localeConfig,
  precision,
  slots,
  skipFirstAnimation,
  transition,
  tickerMotionProps,
  className,
  ...props
}: NumberTickerProps) {
  const { digits, isNegative } = useNumberTicker({
    value,
    asLocal,
    localeConfig,
    precision,
  });
  const delta = useNumberDelta(value);

  return (
    <motion.span
      className={cn(
        'flex h-auto flex-row flex-nowrap overflow-hidden relative text-[inherit]',
        className
      )}
      aria-valuenow={value}
      layout
      layoutRoot
      {...props}
    >
      {slots?.startContent}
      <DigitResolver
        isNegative={isNegative}
        digits={digits}
        tickerMotionProps={tickerMotionProps}
        skipFirstAnimation={skipFirstAnimation}
        transition={transition}
        delta={delta}
      />
      {slots?.endContent}
    </motion.span>
  );
}

export default NumberTicker;
