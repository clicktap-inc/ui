import { TextFieldProps, ValidationResult } from 'react-aria-components';
import { NumberFormatBase } from 'react-number-format';
import {
  StyledFieldError,
  StyledInput,
  StyledLabel,
  StyledText,
  StyledTextField,
} from './styles';

interface CreditCardExpirationInputProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function CreditCardExpirationInput({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: CreditCardExpirationInputProps) {
  const format = (val: string) => {
    if (val === '') return '';
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && Number(month[0]) > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = '12';
      }
    }

    return `${month}/${year}`;
  };

  return (
    <StyledTextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>
      <NumberFormatBase
        format={format}
        customInput={StyledInput}
        placeholder={placeholder}
      />
      {description && <StyledText slot="description">{description}</StyledText>}
      <StyledFieldError>{errorMessage}</StyledFieldError>
    </StyledTextField>
  );
}

CreditCardExpirationInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  placeholder: undefined,
};

export default CreditCardExpirationInput;
