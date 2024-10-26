'use client';

import {
  Group,
  NumberField,
  Button,
  Input,
  Text,
  FieldError,
  Label,
} from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { NumberInputProps } from './NumberInput.types';

const DecrementIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IncrementIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function NumberInput({
  label,
  description,
  errorMessage,
  isInvalid,
  isReadOnly,
  slots,
  className,
  classNames,
  ...props
}: NumberInputProps) {
  const groupClasses = [
    'group-hover:border-slate-400',
    'group-disabled:border-slate-200',
    'group-invalid:border-red-500 group-invalid:bg-red-100 group-invalid:text-red-600',
    'group-invalid:group-hover:border-red-600',
    'group-invalid:group-focus:border-red-600',
  ];
  const buttonClasses = [
    'flex items-center justify-center shrink-0',
    'rounded-md border-solid border',
    'font-semibold text-sm',
    'w-10 h-10 py-0 px-0 cursor-pointer disabled:cursor-default',
    'transition-all duration-200 ease-in-out',
    'focus:outline-2 focus:outline focus:outline-slate-200 pressed:scale-95',
    'bg-transparent hover:bg-transparent focus:bg-transparent disabled:bg-transparent',
    'border-slate-300 hover:border-slate-400 focus:border-slate-400 disabled:border-slate-200',
    'text-slate-900 disabled:text-slate-500',
    'group-aria-readonly:bg-slate-100 group-aria-readonly:text-slate-500 group-aria-readonly:border-slate-200 group-aria-readonly:cursor-default',
  ];

  return (
    <NumberField
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      className={cn('flex flex-col w-full', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Label className={cn('flex text-slate-500 text-sm', classNames?.label)}>
        {label}
      </Label>

      <Group
        isInvalid={isInvalid}
        aria-readonly={isReadOnly}
        className={cn(
          'flex rounded-md group',
          'focus-within:outline-2 focus-within:outline focus-within:outline-slate-200',
          'focus-within:invalid:outline-2 focus-within:invalid:outline focus-within:invalid:outline-slate-200',
          'disabled:bg-slate-100',
          classNames?.group
        )}
      >
        <Button
          slot="decrement"
          className={cn(
            'border-r-0 rounded-r-none',
            buttonClasses,
            groupClasses,
            classNames?.decrementBtn
          )}
        >
          {slots?.decrementIcon}
        </Button>

        <Input
          className={cn(
            'border-solid border border-slate-300',
            'text-sm text-slate-900 placeholder-slate-400',
            'h-10 px-2 py-0 m-0 w-full',
            'bg-white',
            'transition-all duration-200 ease-in-out',
            'hover:border-slate-400',
            'focus:outline-0 focus:border-slate-400',
            'disabled:border-slate-200 disabled:bg-slate-100',
            'invalid:border-red-500 invalid:bg-red-100 invalid:text-red-600',
            'invalid:hover:border-red-600 invalid:focus:border-red-600',
            groupClasses,
            classNames?.input
          )}
        />

        <Button
          slot="increment"
          className={cn(
            'border-l-0 rounded-l-none',
            buttonClasses,
            groupClasses,
            classNames?.incrementBtn
          )}
        >
          {slots?.incrementIcon}
        </Button>
      </Group>

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
    </NumberField>
  );
}

NumberInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  classNames: undefined,
  slots: {
    decrementIcon: DecrementIcon,
    incrementIcon: IncrementIcon,
  },
};

export default NumberInput;
