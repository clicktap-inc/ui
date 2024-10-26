import type { TextFieldProps, ValidationResult } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface CreditCardExpirationInputProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  classNames?: SlotsToClasses<'label' | 'input' | 'description' | 'error'>;
}
