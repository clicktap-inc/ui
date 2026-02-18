'use client';

import {
  FieldError,
  Input as AriaInput,
  Label,
  Text,
  TextField,
} from 'react-aria-components';
import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import type { InputProps } from './Input.types';
import { Skeleton } from '../Skeleton/Skeleton';
import { useIsClient } from '../../hooks/useIsClient';

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

function EyeSlashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

function InputSkeleton({
  className,
}: {
  className: NonNullable<InputProps['classNames']>['skeleton'];
}) {
  return (
    <Skeleton
      className={cn('w-full h-10 rounded-md z-20 relative', className)}
    />
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputProps,
      label,
      description,
      errorMessage,
      placeholder,
      className,
      classNames,
      disableSkeleton,
      type,
      ...props
    },
    ref,
  ) => {
    const isClient = useIsClient();
    const isPassword = type === 'password';
    const [showPassword, setShowPassword] = useState(false);

    if (!isClient && !disableSkeleton) {
      return (
        <div className={cn('flex flex-col w-full text-slate-900', className)}>
          {label ? (
            <Label
              className={cn('flex text-slate-500 text-xs', classNames?.label)}
            >
              {label}
            </Label>
          ) : null}
          <InputSkeleton className={classNames?.skeleton} />
        </div>
      );
    }

    return (
      <TextField
        className={cn('flex flex-col w-full text-slate-900', className)}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        {...props}
      >
        <Label className={cn('flex text-slate-500 text-xs', classNames?.label)}>
          {label}
        </Label>
        <div className="relative">
          <AriaInput
            ref={ref}
            placeholder={placeholder}
            className={cn(
              'border-solid border border-slate-300 rounded-md',
              'text-sm text-slate-900 placeholder-slate-400',
              'h-10 px-2 py-0 m-0 w-full',
              'bg-white',
              'transition-all duration-200 ease-in-out',
              'hover:border-slate-400',
              'focus:outline-2 focus:outline focus:outline-slate-200 focus:border-slate-400',
              'disabled:border-slate-200 disabled:bg-slate-100',
              'invalid:border-red-500 invalid:bg-red-100 invalid:text-red-600',
              'invalid:hover:border-red-600 invalid:focus:border-red-600 invalid:focus:outline-red-200',
              isPassword && 'pr-10',
              classNames?.input,
            )}
            {...inputProps}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {description && (
          <Text
            className={cn(
              'flex text-slate-500 text-sm',
              classNames?.description,
            )}
            slot="description"
          >
            {description}
          </Text>
        )}
        <FieldError
          className={cn('flex text-red-500 text-sm', classNames?.error)}
        >
          {errorMessage}
        </FieldError>
      </TextField>
    );
  },
);

export default Input;
