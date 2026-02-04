'use client';

import { cn } from '../../utils/cn';
import type { PasswordCheckProps } from './PasswordCheck.types';
import { checkStrength, getProgressText } from './PasswordCheck.utils';

export function PasswordCheck({
  value,
  variant = 'default',
}: PasswordCheckProps) {
  const strength = checkStrength(value);

  return (
    <div>
      <div
        className={cn(
          'relative w-full flex gap-x-2',
          variant === 'default' && 'mb-8 -mt-1',
        )}
      >
        {Array.from({ length: 5 }, (_, idx) => idx).map((v, idx) => (
          <div
            className={cn(
              'grow shrink basis-1/5 h-1 rounded-full transition-colors duration-700 ease bg-slate-200',
              strength <= idx && 'bg-slate-600',
              (strength === 1 || strength === 2) && 'bg-red-600',
              strength === 3 && 'bg-yellow-600',
              strength === 4 && 'bg-green-600',
              strength === 5 && 'bg-blue-600',
            )}
            key={v}
          />
        ))}
        {variant === 'default' && (
          <div
            className={cn(
              'inline-flex gap-x-1 absolute top-0 left-0 text-xs translate-y-2/4 text-slate-950',
              strength ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span>Password Strength:</span>
            <span
              className={cn(
                (strength === 1 || strength === 2) && 'text-red-600',
                strength === 3 && 'text-yellow-600',
                strength === 4 && 'text-green-600',
                strength === 5 && 'text-blue-600',
              )}
            >
              {getProgressText(strength)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordCheck;
