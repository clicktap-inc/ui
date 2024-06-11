import { TextFieldProps, ValidationResult } from 'react-aria-components';
import {
  StyledFieldError,
  StyledInput,
  StyledLabel,
  StyledText,
  StyledTextField,
} from './styles';

interface MyTextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function Input({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: MyTextFieldProps) {
  return (
    <StyledTextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>
      <StyledInput placeholder={placeholder} />
      {description && <StyledText slot="description">{description}</StyledText>}
      <StyledFieldError>{errorMessage}</StyledFieldError>
    </StyledTextField>
  );
}

Input.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  placeholder: undefined,
};

export default Input;
