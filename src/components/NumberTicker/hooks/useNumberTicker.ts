import { useMemo } from 'react';
import { NumberTickerConfig } from '../NumberTicker.types';

export const useNumberTicker = ({
  value = 0,
  asLocal = false,
  localeConfig = {
    locale: 'en-US',
    options: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    },
  },
  precision = 2,
}: NumberTickerConfig) => {
  const parsed = parseFloat(`${Math.max(Math.abs(value), 0)}`).toFixed(
    precision ?? 0,
  );

  const number = asLocal
    ? new Intl.NumberFormat(localeConfig?.locale, {
        ...localeConfig?.options,
      }).format(parseFloat(parsed))
    : parsed;

  return useMemo(
    () => ({
      digits: number.split(''),
      isNegative: value < 0,
    }),
    [number, value],
  );
};

export default useNumberTicker;
