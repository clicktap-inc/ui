import type { MotionProps, Transition } from 'framer-motion';
import { NumberTickerProps, TickerMotionProps } from './NumberTicker.types';

export type DigitResolverProps = Pick<
  NumberTickerProps,
  'tickerMotionProps' | 'skipFirstAnimation' | 'transition'
> &
  TickerMotionProps & {
    digits: string[];
    isNegative: boolean;
  };

export type DigitProps = Pick<NumberTickerProps, 'tickerMotionProps'> & {
  digit: string;
  tickerMotionProps: MotionProps | undefined;
  transition: Transition;
  updateTransition: () => void;
};
