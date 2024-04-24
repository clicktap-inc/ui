import type {
  TimeFieldProps,
  TimeValue,
  ValidationResult,
} from 'react-aria-components';

export interface TimeInputProps extends TimeFieldProps<TimeValue> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}
