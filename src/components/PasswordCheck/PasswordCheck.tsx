'use client';

import { cn } from '../../utils/cn';
import type { PasswordCheckProps } from './PasswordCheck.types';
import { checkStrength, getProgressText } from './PasswordCheck.utils';

const defaultRequirements = [
  {
    label: 'At least 8 characters',
    test: (v: string) => v.length >= 8,
  },
  {
    label: 'At least one uppercase letter',
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    label: 'At least one digit',
    test: (v: string) => /\d/.test(v),
  },
  {
    label: 'At least one special character',
    test: (v: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(v),
  },
];

export function PasswordCheck({
  value,
  variant = 'default',
  requirements = defaultRequirements,
}: PasswordCheckProps) {
  const strength = checkStrength(value);

  if (variant === 'requirements') {
    return (
      <div className="mt-4 flex flex-col gap-2">
        <ul className="flex flex-col gap-1 text-xs text-left">
          {requirements.map((req) => {
            const met = req.test(value);
            return (
              <li key={req.label} className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    'shrink-0 transition-colors',
                    met ? 'text-green-600' : 'text-slate-400',
                  )}
                >
                  {met ? (
                    <path d="M20 6 9 17l-5-5" />
                  ) : (
                    <circle cx="12" cy="12" r="4" />
                  )}
                </svg>
                <span
                  className={cn(
                    'transition-colors',
                    met ? 'text-green-700' : 'text-slate-500',
                  )}
                >
                  {req.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col">
          <div className="w-full flex gap-x-2">
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
          </div>
          <div
            className={cn(
              'inline-flex gap-x-1 text-xs text-slate-950 transition-opacity mt-1',
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
        </div>
      </div>
    );
  }

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
