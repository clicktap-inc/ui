import type {
  DateFieldProps,
  DateValue,
  ValidationResult,
} from 'react-aria-components';
import {
  StyledDateField,
  StyledDateInput,
  StyledDateSegment,
  StyledFieldError,
  StyledLabel,
  StyledText,
} from './styles';

interface DateInputProps extends DateFieldProps<DateValue> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateInput({
  label,
  description,
  errorMessage,
  ...props
}: DateInputProps) {
  return (
    <StyledDateField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>
      <StyledDateInput>
        {(segment) => <StyledDateSegment segment={segment} />}
      </StyledDateInput>
      <StyledText slot="description">{description}</StyledText>
      <StyledFieldError>{errorMessage}</StyledFieldError>
    </StyledDateField>
  );
}

DateInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
};

export default DateInput;
