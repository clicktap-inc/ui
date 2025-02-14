'use client';

import {
  DateField,
  DateInput as AriaDateInput,
  DateSegment,
  FieldError,
  Label,
  Text,
} from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { DateInputProps } from './DateInput.types';

export function DateInput({
  label,
  description,
  errorMessage,
  className,
  classNames,
  ...props
}: DateInputProps) {
  return (
    <DateField
      className={cn('text-slate-900', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Label className={cn('flex text-slate-500 text-xs', classNames?.label)}>
        {label}
      </Label>
      <AriaDateInput
        className={cn(
          'flex items-center',
          'border-solid border border-slate-300 rounded-md',
          'text-sm text-slate-900',
          'h-10 px-1 py-0 m-0 w-full',
          'bg-white',
          'transition-all duration-200 ease-in-out',
          'hover:border-slate-400',
          'focus-within:outline-2 focus-within:outline focus-within:outline-slate-200 focus-within:border-slate-400',
          'disabled:border-slate-200 disabled:bg-slate-100',
          'invalid:border-red-500 invalid:bg-red-100 invalid:text-red-600',
          'invalid:hover:border-red-600 invalid:focus-within:border-red-600 invalid:focus-within:outline-red-200',
          classNames?.input
        )}
      >
        {(segment) => (
          <DateSegment
            segment={segment}
            className={cn(
              'p-1 tabular-nums text-end text-slate-900',
              'invalid:text-red-500',
              'disabled:cursor-default disabled:select-none disabled:text-slate-400',
              'focus:text-slate-900 focus:bg-slate-200 focus:outline-0 focus:rounded-md focus:caret-transparent focus:invalid:bg-red-500 focus:invalid:text-white',
              'type-literal:p-0',
              'data-[placeholder]:text-slate-400 data-[placeholder]:invalid:text-red-500 data-[placeholder]:invalid:focus:text-white',
              'aria-[readonly]:focus-visible:outline aria-[readonly]:focus-visible:outline-slate-500 aria-[readonly]:focus-visible:outline-1',
              'aria-[readonly]:focus:outline aria-[readonly]:focus:outline-slate-500 aria-[readonly]:focus:bg-transparent aria-[readonly]:focus:outline-2',
              classNames?.segment
            )}
          />
        )}
      </AriaDateInput>
      {description && (
        <Text
          className={cn('flex text-slate-500 text-sm', classNames?.description)}
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
    </DateField>
  );
}

export default DateInput;
