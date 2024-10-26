import type {
  TimeFieldProps,
  TimeValue,
  ValidationResult,
} from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface TimeInputProps extends TimeFieldProps<TimeValue> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  classNames?: SlotsToClasses<
    'label' | 'input' | 'description' | 'error' | 'segment'
  >;
}
