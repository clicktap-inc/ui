import type {
  InputProps as AriaInputProps,
  TextFieldProps,
  ValidationResult,
} from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface InputProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  classNames?: SlotsToClasses<'label' | 'input' | 'description' | 'error'>;
  inputProps?: AriaInputProps;
}
