import { useState, useEffect } from 'react';
import { TextFieldProps, ValidationResult } from 'react-aria-components';
import { NumberFormatBase, NumberFormatValues } from 'react-number-format';
import {
  StyledFieldError,
  StyledInput,
  StyledLabel,
  StyledText,
  StyledTextField,
} from './styles';

interface CreditCardInputProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
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

export function CreditCardInput({
  label,
  description,
  errorMessage,
  placeholder,
  value,
  onChange,
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
    <StyledTextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>
      <NumberFormatBase
        value={inputValue}
        format={format}
        customInput={StyledInput}
        placeholder={placeholder}
        onValueChange={handleValueChange}
      />
      {description && <StyledText slot="description">{description}</StyledText>}
      <StyledFieldError>{errorMessage}</StyledFieldError>
    </StyledTextField>
  );
}

CreditCardInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  placeholder: undefined,
  value: undefined,
  onChange: () => {},
};

export default CreditCardInput;
