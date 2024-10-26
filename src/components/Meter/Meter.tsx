'use client';

import { Meter as AriaMeter, Label } from 'react-aria-components';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { MeterProps } from './Meter.types';

export function Meter({
  label,
  showValue = true,
  value = 0,
  minValue = 0,
  maxValue = 100,
  formatOptions = { style: 'percent' },
  className,
  classNames,
  ...props
}: MeterProps) {
  return (
    <AriaMeter
      className={cn('flex flex-col gap-2', className)}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      formatOptions={formatOptions}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {({ percentage, valueText }) => (
        <>
          {(label || showValue) && (
            <div
              className={cn(
                'flex justify-between gap-4',
                classNames?.labelWrapper
              )}
            >
              {label && (
                <Label className={cn('text-sm', classNames?.label)}>
                  {label}
                </Label>
              )}
              {showValue && (
                <span
                  className={cn(
                    'text-sm tabular-nums ml-auto',
                    classNames?.value
                  )}
                >
                  {valueText}
                </span>
              )}
            </div>
          )}

          <div
            className={cn(
              'h-2.5 rounded-md bg-slate-300 forced-color-adjust-none overflow-hidden',
              classNames?.trackWrapepr
            )}
          >
            <motion.div
              className={cn('h-full bg-slate-800', classNames?.track)}
              initial={{ width: `${percentage}%` }}
              animate={{ width: `${percentage}%` }}
              transition={{
                type: 'spring',
                bounce: 0,
              }}
            />
          </div>
        </>
      )}
    </AriaMeter>
  );
}

Meter.defaultProps = {
  showValue: undefined,
  label: undefined,
  classNames: undefined,
};

export default Meter;
