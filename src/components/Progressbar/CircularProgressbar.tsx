'use client';

import { ProgressBar, Label } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { CircularProgressbarProps } from './CircularProgressbar.types';

export function CircularProgressbar({
  label,
  value = 0,
  showValue = true,
  size = 60,
  strokeWidth = 6,
  className,
  classNames,
  ...props
}: CircularProgressbarProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    <ProgressBar
      aria-label="Loading..."
      className={cn('flex', className)}
      {...props}
      value={value}
    >
      {({ percentage = 0 }) => (
        <div className={cn('flex items-center flex-col', classNames?.base)}>
          <Label className={cn('text-sm', classNames?.label)}>{label}</Label>
          <svg width={size} height={size} fill="none">
            <circle
              className={cn('stroke-slate-300')}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className={cn(
                'stroke-slate-800 transition-stroke-dashoffset duration-500 ease-in-out'
              )}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={((100 - percentage) / 100) * circumference}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
            {showValue && (
              <text
                className={cn('text-sm fill-slate-800', classNames?.value)}
                x="50%"
                y="50%"
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {percentage}%
              </text>
            )}
          </svg>
        </div>
      )}
    </ProgressBar>
  );
}

export default CircularProgressbar;
