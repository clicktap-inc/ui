import type {
  DateFieldProps,
  DateValue,
  ValidationResult,
} from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface DateInputProps extends DateFieldProps<DateValue> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  classNames?: SlotsToClasses<
    'label' | 'input' | 'description' | 'error' | 'segment'
  >;
}
