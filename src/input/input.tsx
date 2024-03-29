import { TextFieldProps, ValidationResult } from 'react-aria-components';
import {
  StyledFieldError,
  StyledInput,
  StyledLabel,
  StyledText,
  StyledTextField,
} from './input.styles';

interface MyTextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Input({
  label,
  description,
  errorMessage,
  ...props
}: MyTextFieldProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledTextField {...props}>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput />
      {description && <StyledText slot="description">{description}</StyledText>}
      <StyledFieldError>{errorMessage}</StyledFieldError>
    </StyledTextField>
  );
}

Input.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
};

export default Input;
