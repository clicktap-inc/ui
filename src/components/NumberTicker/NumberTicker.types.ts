import type { MotionProps, Transition } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

export type TickerMotionProps = {
  delta: 'increase' | 'decrease' | 'same';
};

export type TransitionConfig = {
  /**
   * Whether the NumberTicker animation on render
   * @default true
   */
  skipFirstAnimation?: boolean;
  /**
   * The transition props to modify the NumberTicker animation.
   * Use the framer motion transition API to create your own transition.
   */
  transition?: Transition;
};

export interface NumberTickerConfig {
  value: number;
  /**
   * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   * @default 2
   */
  precision?: number;
  /**
   *  Whether the NumberTicker value as Intl.NumberFormat
   *  @default false
   */
  asLocal?: boolean;
  /**
   *  The configuration for the NumberTicker value as Intl.NumberFormat
   *  By default the object {
        locale: 'en-US',
        options: {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        },
      }
   */
  localeConfig?: {
    locale?: string;
    options?: Intl.NumberFormatOptions | undefined;
  };
}

export type NumberTickerProps = NumberTickerConfig &
  TransitionConfig & {
    style?: CSSProperties;
    className?: string;
    slots?: {
      /**
       * Element to be rendered in the left side of the NumberTicker.
       */
      startContent?: ReactNode;
      /**
       * Element to be rendered in the right side of the NumberTicker.
       */
      endContent?: ReactNode;
    };

    /**
     * The motion props to modify the each Ticker animation.
     * Use the framer motion API to create your own animation. With the possible to use the delta value
     * Example:
     * 
     * const getColor = (delta: TickerMotionProps) => {
          switch (d) {
            case 'increase':
              return '#48ff0b';
            case 'decrease':
              return '#F22613';
            default:
              return '#fff';
          }
        };

        <NumberTicker
          tickerMotionProps={({ delta }) => ({
            animate: {
              color: [getColor(delta), '#fff'],
              transition: {
                duration: 2,
              },
            },
          })}
        />
     * 
     */
    tickerMotionProps?:
      | MotionProps
      | ((props: TickerMotionProps) => MotionProps);
  };
