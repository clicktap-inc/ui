import { useState, useEffect } from 'react';
import {
  InputAttributes,
  NumberFormatBase,
  NumberFormatValues,
} from 'react-number-format';
import {
  FieldError,
  Input,
  Label,
  Text,
  TextField,
  TextFieldProps,
  ValidationResult,
} from 'react-aria-components';
import { cn } from '../utils';
import type { SlotsToClasses } from '../types';

interface CreditCardInputProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  classNames?: SlotsToClasses<'label' | 'input' | 'description' | 'error'>;
}

const getCardFormat = (cardNumber: string) => {
  const cardPatterns = [
    { regex: /^4[0-9]{0,15}/, format: '#### #### #### ####' }, // Visa
    { regex: /^5[1-5][0-9]{0,14}/, format: '#### #### #### ####' }, // MasterCard
    { regex: /^3[47][0-9]{0,13}/, format: '#### ###### #####' }, // American Express
    { regex: /^6(?:011|5[0-9]{2})[0-9]{0,12}/, format: '#### #### #### ####' }, // Discover
    { regex: /^3(?:0[0-5]|[68][0-9])[0-9]{0,11}/, format: '#### ###### ####' }, // Diners Club
    { regex: /^(?:2131|1800|35\d{3})\d{0,11}/, format: '#### #### #### ####' }, // JCB
  ];

  const matchingPattern = cardPatterns.find((cardPattern) =>
    cardPattern.regex.test(cardNumber)
  );
  if (matchingPattern) {
    return matchingPattern.format;
  }

  // Default format if no match found
  return '#### #### #### #### ###';
};

function AriaInput({ className, ...props }: InputAttributes) {
  return (
    <Input
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
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export function CreditCardInput({
  label,
  description,
  errorMessage,
  placeholder,
  value,
  onChange,
  className,
  classNames,
  ...props
}: CreditCardInputProps) {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const format = (val: string) => {
    if (val === '') return '';
    const cleanedVal = val.replace(/\s+/g, '');
    const cardFormat = getCardFormat(cleanedVal);

    // Add spaces according to the format
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
    const cleanedVal = values.value.replace(/\s+/g, '');
    const cardFormat = getCardFormat(cleanedVal);
    const maxLength = cardFormat.replace(/[^#]/g, '').length;
    const truncatedVal = cleanedVal.slice(0, maxLength);

    setInputValue(truncatedVal);
    if (onChange) {
      onChange(truncatedVal);
    }
  };

  return (
    <TextField
      className={cn('flex flex-col w-full text-slate-900', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Label className={cn('flex text-slate-500 text-sm', classNames?.label)}>
        {label}
      </Label>
      <NumberFormatBase
        value={inputValue}
        format={format}
        customInput={AriaInput}
        className={cn(classNames?.input)}
        placeholder={placeholder}
        onValueChange={handleValueChange}
      />
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
    </TextField>
  );
}

CreditCardInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  placeholder: undefined,
  classNames: undefined,
  value: undefined,
  onChange: () => {},
};

export default CreditCardInput;
