'use client';

import {
  FieldError,
  Input as AriaInput,
  Label,
  Text,
  TextField,
} from 'react-aria-components';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { InputProps } from './Input.types';
import { Skeleton } from '../Skeleton/Skeleton';
import { useIsClient } from '../../hooks/useIsClient';

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
      ...props
    },
    ref,
  ) => {
    const isClient = useIsClient();

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
        {...props}
      >
        <Label className={cn('flex text-slate-500 text-xs', classNames?.label)}>
          {label}
        </Label>
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
            classNames?.input,
          )}
          {...inputProps}
        />

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
