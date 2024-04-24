import {
  Group,
  GroupProps,
  Input,
  TextField,
  ValidationResult,
} from 'react-aria-components';
import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyledFieldError,
  StyledGroup,
  StyledHiddenTextField,
  StyledInput,
  StyledLabel,
  StyledText,
  StyledTextField,
} from './styles';

/** @todo extend certain textfield props like name, validationBehavior and isRequired */
interface PinInputProps extends GroupProps {
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  label?: string;
  length?: number;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (...event: any[]) => void;
  value?: string;
  isMasked?: boolean;
  isRequired?: boolean;
  type?: 'alpha' | 'alphanumeric' | 'numeric';
  validationBehavior?: 'native' | 'aria';
}

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
  ...props
}: PinInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledGroup {...props} aria-label={label}>
      <StyledLabel>{label}</StyledLabel>
      {values.map((v, i) => (
        <StyledTextField
          // eslint-disable-next-line react/no-array-index-key
          key={`pin-input-${i}`}
          aria-label={`Pin Input Digit ${i + 1}`}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isRequired={isRequired}
          validationBehavior={validationBehavior}
        >
          <StyledInput
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
        </StyledTextField>
      ))}
      <StyledHiddenTextField
        aria-label="Pin Input"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        validationBehavior={validationBehavior}
      >
        {name && <Input type="hidden" name={name} value={joinedValue} />}
        {description && (
          <StyledText slot="description">{description}</StyledText>
        )}
        <StyledFieldError>{errorMessage}</StyledFieldError>
      </StyledHiddenTextField>
    </StyledGroup>
  );
}

PinInput.defaultProps = {
  description: undefined,
  errorMessage: undefined,
  isMasked: false,
  isRequired: true,
  label: undefined,
  length: 6,
  name: '',
  onChange: () => {},
  value: '',
  type: 'numeric',
  validationBehavior: 'native',
};

export default PinInput;
