'use client';

import { memo, useId, useMemo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import type { DigitProps, DigitResolverProps } from './DigitResolver.types';
import { useColumnTransition } from './hooks/useColumnTransition';

const NUMBER_REGEX = /^-?\d*\.?\d+$/;

function Digit({
  digit,
  tickerMotionProps,
  transition,
  updateTransition,
}: DigitProps) {
  const [position, setPosition] = useState(0);

  const updatePosition = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setPosition(node.clientHeight * parseInt(digit, 10));
      }
    },
    [digit]
  );

  return (
    <span className="relative h-auto block" ref={updatePosition} aria-hidden>
      <motion.span
        className="absolute block bottom-0 h-[1000%]"
        initial={{ x: 0, y: position }}
        animate={{ x: 0, y: position }}
        transition={{ ...transition }}
        onAnimationComplete={updateTransition}
        style={{ fontFeatureSettings: 'tnum' }}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((i) => (
          <motion.span
            className="block text-[inherit] leading-[inherit] tabular-nums"
            key={i}
            {...tickerMotionProps}
          >
            {i}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        className="block text-[inherit] leading-[inherit] invisible"
        aria-hidden
      >
        0
      </motion.span>
    </span>
  );
}

const DigitMemo = memo(Digit);

export function DigitResolver({
  delta,
  digits,
  isNegative,
  tickerMotionProps,
  ...transitionConfig
}: DigitResolverProps) {
  const id = useId();
  const motionProps = useMemo(
    () =>
      typeof tickerMotionProps === 'function'
        ? tickerMotionProps({ delta })
        : tickerMotionProps,
    [delta, tickerMotionProps]
  );

  const columnTransition = useColumnTransition({
    ...transitionConfig,
  });

  return (
    <>
      {isNegative && (
        <motion.span
          className="block text-[inherit] leading-[inherit] tabular-nums"
          aria-hidden
          {...motionProps}
        >
          -
        </motion.span>
      )}
      {digits.map((digit, idx) =>
        NUMBER_REGEX.test(digit) ? (
          <DigitMemo
            key={`${id}_${idx}`}
            digit={digit}
            tickerMotionProps={motionProps}
            {...columnTransition}
          />
        ) : (
          <motion.span
            className="block text-[inherit] leading-[inherit] tabular-nums"
            key={`${id}_${idx}`}
            aria-hidden
            {...motionProps}
          >
            {digit}
          </motion.span>
        )
      )}
    </>
  );
}

export default DigitResolver;
