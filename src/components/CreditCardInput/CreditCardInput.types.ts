import type { TextFieldProps, ValidationResult } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface CreditCardInputProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  classNames?: SlotsToClasses<'label' | 'input' | 'description' | 'error'>;
}
