'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import { Group, Label } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { PinInputProps } from './PinInput.types';

/** based on https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/src/pin-input/use-pin-input.ts */
export function PinInput({
  autoFocus = false,
  description,
  errorMessage,
  isDisabled = false,
  isInvalid = false,
  isMasked = false,
  isRequired = true,
  label,
  length = 6,
  name: _name,
  onChange: controlledOnChange,
  value: _value = '',
  type = 'numeric',
  validationBehavior: _validationBehavior,
  className,
  classNames,
  ...props
}: PinInputProps) {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const inputIndex = Number(
        event.target.getAttribute('data-pin-input-index'),
      );

      if (inputValue !== '' && inputIndex < length - 1) {
        inputRefs.current?.[inputIndex + 1]?.focus();
      }

      const updatedValues = values.map((v, i) =>
        i === inputIndex ? inputValue : v,
      );
      setValues(updatedValues);

      const newJoinedValue = updatedValues.join('');
      controlledOnChange?.(newJoinedValue);
    },
    [values, length, controlledOnChange],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const inputIndex = Number(
        event.currentTarget.getAttribute('data-pin-input-index'),
      );

      if (event.ctrlKey || event.metaKey) {
        return;
      }

      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Control',
        'Alt',
        'Meta',
        'Shift',
        'Tab',
        'Enter',
        'Escape',
      ];

      const regex = {
        alpha: /^[a-z]$/i,
        alphanumeric: /^[a-z0-9]$/i,
        numeric: /^[0-9]$/i,
      };

      if (!event.key.match(regex[type]) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }

      if (
        values[inputIndex] === '' &&
        inputIndex > 0 &&
        event.key === 'Backspace'
      ) {
        const updatedValues = values.map((v, i) =>
          i === inputIndex - 1 ? '' : v,
        );
        setValues(updatedValues);
        inputRefs.current?.[inputIndex - 1]?.focus();
        event.preventDefault();

        const newJoinedValue = updatedValues.join('');
        controlledOnChange?.(newJoinedValue);
      }

      if (
        values[inputIndex] === '' &&
        inputIndex < values.length - 1 &&
        event.key === 'Delete'
      ) {
        const updatedValues = values.map((v, i) =>
          i === inputIndex + 1 ? '' : v,
        );
        setValues(updatedValues);
        inputRefs.current?.[inputIndex + 1]?.focus();
        event.preventDefault();

        const newJoinedValue = updatedValues.join('');
        controlledOnChange?.(newJoinedValue);
      }
    },
    [values, type, controlledOnChange],
  );

  const onPaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      const inputIndex = Number(
        event.currentTarget.getAttribute('data-pin-input-index'),
      );

      event.preventDefault();

      const pasteData = event.clipboardData?.getData('text');
      if (!pasteData) return;

      const splitValue = pasteData.split('').filter((char) => {
        switch (type) {
          case 'alpha':
            return /^[a-zA-Z]$/.test(char);
          case 'alphanumeric':
            return /^[a-z0-9]$/i.test(char);
          case 'numeric':
          default:
            return /^[0-9]$/.test(char);
        }
      });

      if (splitValue.length === 0) {
        return;
      }

      const updatedValues = [...values];

      let focusIndex = inputIndex;

      for (let i = 0; i < splitValue.length && inputIndex + i < length; i++) {
        updatedValues[inputIndex + i] = splitValue[i];
        focusIndex = inputIndex + i;
      }

      setValues(updatedValues);

      const newJoinedValue = updatedValues.join('');
      controlledOnChange?.(newJoinedValue);

      const nextInputIndex =
        focusIndex + 1 < length ? focusIndex + 1 : length - 1;
      inputRefs.current[nextInputIndex]?.focus();
    },
    [values, type, length, controlledOnChange],
  );

  return (
    <Group
      className={cn('flex flex-wrap gap-2', className)}
      aria-label={label}
      {...props}
    >
      {label && (
        <Label
          className={cn(
            'flex text-slate-500 text-sm grow shrink-0 basis-full',
            classNames?.label,
          )}
        >
          {label}
        </Label>
      )}

      {values.map((v, i) => (
        <div
          className={cn(
            'flex flex-col w-full flex-1 text-slate-900',
            classNames?.inputWrap,
          )}
          key={`pin-input-${i}`}
        >
          <input
            className={cn(
              'border-solid border border-slate-300 rounded-md',
              'text-sm text-slate-900 placeholder-slate-400 text-center',
              'h-10 px-2 py-0 m-0 w-full',
              'bg-white',
              'transition-all duration-200 ease-in-out',
              'hover:border-slate-400',
              'focus:outline-2 focus:outline focus:outline-slate-200 focus:border-slate-400',
              'disabled:border-slate-200 disabled:bg-slate-100',
              isInvalid && 'border-red-500 bg-red-100 text-red-600',
              isInvalid &&
                'hover:border-red-600 focus:border-red-600 focus:outline-red-200',
              classNames?.input,
            )}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            type={isMasked ? 'password' : 'text'}
            autoComplete="one-time-code"
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            value={v}
            maxLength={1}
            data-pin-input-index={i}
            disabled={isDisabled}
            required={isRequired}
            aria-label={`Pin Input Digit ${i + 1}`}
          />
        </div>
      ))}

      {(description || (isInvalid && errorMessage)) && (
        <div
          className={cn(
            'flex flex-row flex-wrap grow shrink-0 basis-full',
            classNames?.textWrap,
          )}
        >
          {description && (
            <p
              className={cn(
                'flex text-slate-500 text-sm grow shrink-0 basis-full',
                classNames?.description,
              )}
            >
              {description}
            </p>
          )}
          {isInvalid && errorMessage && typeof errorMessage === 'string' && (
            <p
              className={cn(
                'flex text-red-500 text-sm grow shrink-0 basis-full',
                classNames?.error,
              )}
            >
              {errorMessage}
            </p>
          )}
        </div>
      )}
    </Group>
  );
}

export default PinInput;
