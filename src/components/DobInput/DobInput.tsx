'use client';

import { useId, useState } from 'react';
import { FieldError, Input, Label, TextField } from 'react-aria-components';
import {
  type InputAttributes,
  NumberFormatBase,
  type NumberFormatValues,
} from 'react-number-format';
import { cn } from '../../utils/cn';
// import { ErrorMessage } from '../ErrorMessage';
// import { FieldLabel } from '../FieldLabel';
import type { InputProps } from '../Input/Input.types';
// import { inputBaseClasses } from '../Input/Input';

function AriaInput({ className, ...props }: InputAttributes) {
  return (
    <Input
      className={cn('peer h-11', /** inputBaseClasses, */ className)}
      {...props}
    />
  );
}

export function DobInput({
  label,
  description: _description,
  errorMessage,
  type,
  className,
  classNames,
  // inputProps,
  id,
  value,
  onChange,
  ...props
}: InputProps) {
  const inputId = useId();
  const [internalValue, setInternalValue] = useState('');
  const inputValue = value ?? internalValue;

  const format = (val: string) => {
    if (val === '') return '';
    const cleanedVal = val.replace(/\s+/g, '');
    const cardFormat = '##-##-####';

    let formattedVal = '';
    let position = 0;

    for (let i = 0; i < cardFormat.length; i += 1) {
      if (cardFormat[i] === '#') {
        if (position < cleanedVal.length) {
          formattedVal += cleanedVal[position];
          position += 1;
        } else {
          break;
        }
      } else {
        formattedVal += cardFormat[i];
      }
    }

    return formattedVal;
  };

  const handleValueChange = (values: NumberFormatValues) => {
    setInternalValue(values.formattedValue);
    onChange?.(values.formattedValue);
  };

  return (
    <TextField
      className={cn('flex flex-col w-full text-slate-900', className)}
      type={type}
      {...props}
    >
      <Label
        className={cn('flex text-slate-500 text-xs', classNames?.label)}
        htmlFor={id || inputId}
      >
        {label}
      </Label>
      <NumberFormatBase
        id={id || inputId}
        value={inputValue}
        format={format}
        customInput={AriaInput}
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
        onValueChange={handleValueChange}
      />

      {errorMessage && (
        <FieldError className={cn(classNames?.error)}>
          {errorMessage}
        </FieldError>
      )}
    </TextField>
  );
}

export default DobInput;
