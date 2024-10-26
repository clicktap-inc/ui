'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import {
  FieldError,
  Group,
  Input,
  Label,
  Text,
  TextField,
} from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { PinInputProps } from './PinInput.types';

/** based on https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/src/pin-input/use-pin-input.ts */
export function PinInput({
  description,
  errorMessage,
  isDisabled = false,
  isInvalid = false,
  isMasked = false,
  isRequired = true,
  label,
  length = 6,
  name,
  onChange: controlledOnChange,
  value = '',
  type = 'numeric',
  validationBehavior = 'native',
  className,
  classNames,
  ...props
}: PinInputProps) {
  // const [focusedIndex, setFocusedIndex] = useState(-1);
  const [joinedValue, setJoinedValue] = useState(value);
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    const updatedValue = values.join('');
    setJoinedValue(updatedValue);
    if (controlledOnChange) controlledOnChange(updatedValue);
  }, [controlledOnChange, values]);

  //   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const eventValue = event.target.value;
  //     const currentValue = values[index];
  //     const nextValue = getNextValue(currentValue, eventValue);
  //     const allItems = getAllItems(containerRef.current);

  //     // if the value was removed using backspace
  //     if (nextValue === '') {
  //       setValue('', index);
  //       return;
  //     }

  //     // in the case of an autocomplete or copy and paste
  //     if (eventValue.length > 2) {
  //       // see if we can use the string to fill out our values
  //       if (validate(eventValue, type)) {
  //         // Ensure the value matches the number of inputs
  //         const nextValue = eventValue
  //           .split('')
  //           .filter((_, index) => index < allItems.length);

  //         setValues(nextValue);
  //         // if pasting fills the entire input fields, trigger `onComplete`
  //         if (nextValue.length === allItems.length) {
  //           onComplete?.(nextValue.join(''));
  //         }
  //       }
  //     } else {
  //       // only set if the new value is a number
  //       if (validate(nextValue, type)) {
  //         setValue(nextValue, index);
  //       }

  //       setMoveFocus(true);
  //     }
  //   };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputIndex = Number(
      event.target.getAttribute('data-pin-input-index')
    );

    if (inputValue !== '' && inputIndex < values.length - 1) {
      inputRefs.current?.[inputIndex + 1]?.focus();
    }

    const updatedValues = values.map((v, i) =>
      i === inputIndex ? inputValue : v
    );
    setValues(updatedValues);

    // return setValues(updatedValues);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // const inputValue = event.currentTarget.value;
    const inputIndex = Number(
      event.currentTarget.getAttribute('data-pin-input-index')
    );

    // Allow standard keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    /** @todo is there a better way to pass through control keys? */
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
        i === inputIndex - 1 ? '' : v
      );
      setValues(updatedValues);
      inputRefs.current?.[inputIndex - 1]?.focus();
      event.preventDefault();
    }

    if (
      values[inputIndex] === '' &&
      inputIndex < values.length - 1 &&
      event.key === 'Delete'
    ) {
      const updatedValues = values.map((v, i) =>
        i === inputIndex + 1 ? '' : v
      );
      setValues(updatedValues);
      inputRefs.current?.[inputIndex + 1]?.focus();
      event.preventDefault();
    }

    // const prevValues = value;
    // prevValues[inputIndex] += inputValue;
    // setValue(prevValues);
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const inputIndex = Number(
      event.currentTarget.getAttribute('data-pin-input-index')
    );

    event.preventDefault();

    const pasteData = event.clipboardData?.getData('text');
    if (!pasteData) return;

    /** @todo update to fail paste if contains invalid chars? */
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

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < splitValue.length && inputIndex + i < length; i++) {
      updatedValues[inputIndex + i] = splitValue[i];
      focusIndex = inputIndex + i;
    }

    setValues(updatedValues);

    const nextInputIndex =
      focusIndex + 1 < length ? focusIndex + 1 : length - 1;
    inputRefs.current[nextInputIndex]?.focus();
  };

  return (
    <Group
      className={cn('flex flex-wrap gap-2', className)}
      aria-label={label}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Label
        className={cn(
          'flex text-slate-500 text-sm grow shrink-0 basis-full',
          classNames?.label
        )}
      >
        {label}
      </Label>

      {values.map((v, i) => (
        <TextField
          className={cn(
            'flex flex-col w-full flex-1 text-slate-900',
            classNames?.inputWrap
          )}
          // eslint-disable-next-line react/no-array-index-key
          key={`pin-input-${i}`}
          aria-label={`Pin Input Digit ${i + 1}`}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isRequired={isRequired}
          validationBehavior={validationBehavior}
        >
          <Input
            className={cn(
              'border-solid border border-slate-300 rounded-md',
              'text-sm text-slate-900 placeholder-slate-400 text-center',
              'h-10 px-2 py-0 m-0 w-full',
              'bg-white',
              'transition-all duration-200 ease-in-out',
              'hover:border-slate-400',
              'focus:outline-2 focus:outline focus:outline-slate-200 focus:border-slate-400',
              'disabled:border-slate-200 disabled:bg-slate-100',
              'invalid:border-red-500 invalid:bg-red-100 invalid:text-red-600',
              'invalid:hover:border-red-600 invalid:focus:border-red-600 invalid:focus:outline-red-200',
              classNames?.input
            )}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            type={isMasked ? 'password' : 'text'}
            // eslint-disable-next-line no-return-assign
            ref={(el) => (el ? (inputRefs.current[i] = el) : null)}
            value={v}
            maxLength={1}
            name={name && `${name}-${i}`}
            // pattern="[0-9]*"
            data-pin-input-index={i}
          />
          {/* {description && (
          <StyledText slot="description">{description}</StyledText>
        )} */}
        </TextField>
      ))}
      <TextField
        className={cn(
          'flex flex-row flex-wrap grow shrink-0 basis-full',
          classNames?.textWrap
        )}
        aria-label="Pin Input"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        validationBehavior={validationBehavior}
      >
        {name && <Input type="hidden" name={name} value={joinedValue} />}
        {description && (
          <Text
            className={cn(
              'flex text-slate-500 text-sm grow shrink-0 basis-full',
              classNames?.description
            )}
            slot="description"
          >
            {description}
          </Text>
        )}
        <FieldError
          className={cn(
            'flex text-red-500 text-sm grow shrink-0 basis-full',
            classNames?.error
          )}
        >
          {errorMessage}
        </FieldError>
      </TextField>
    </Group>
  );
}

PinInput.defaultProps = {
  description: undefined,
  errorMessage: undefined,
  isMasked: false,
  isRequired: true,
  label: undefined,
  classNames: undefined,
  length: 6,
  name: '',
  onChange: () => {},
  value: '',
  type: 'numeric',
  validationBehavior: 'native',
};

export default PinInput;
