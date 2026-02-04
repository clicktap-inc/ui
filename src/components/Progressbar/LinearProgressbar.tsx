'use client';

import { ProgressBar, Label } from 'react-aria-components';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { LinearProgressbarProps } from './LinearProgressbar.types';

export function LinearProgressbar({
  label,
  isIndeterminate,
  showValue = true,
  width,
  className,
  classNames,
  ...props
}: LinearProgressbarProps) {
  return (
    <ProgressBar
      style={{ width: width || '100%' }}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {({ percentage, valueText }) => (
        <>
          <div
            className={cn(
              'flex items-center justify-between gap-2 mb-1',
              classNames?.labelWrapper,
            )}
          >
            <Label className={cn('text-sm', classNames?.label)}>{label}</Label>
            {showValue && (
              <span className={cn('text-sm', classNames?.value)}>
                {valueText}
              </span>
            )}
          </div>
          <div
            className={cn(
              'overflow-hidden forced-color-adjust-none h-2.5 rounded will-change-transform bg-slate-300',
              classNames?.trackWrapper,
            )}
          >
            <motion.div
              style={{
                width:
                  !isIndeterminate && typeof percentage === 'number'
                    ? `${percentage}%`
                    : '',
              }}
              {...(isIndeterminate && {
                animate: {
                  x: ['-100%', '250px'],
                },
                transition: { repeat: Infinity, duration: 1.5 },
              })}
              className={cn(
                'h-full bg-slate-800 rounded transition-width duration-500 ease-in-out',
                {
                  'w-1/2': isIndeterminate,
                  'transition-none': isIndeterminate,
                },
                classNames?.track,
              )}
            />
          </div>
        </>
      )}
    </ProgressBar>
  );
}

export default LinearProgressbar;
