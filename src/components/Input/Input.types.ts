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
  classNames?: SlotsToClasses<
    'label' | 'input' | 'description' | 'error' | 'skeleton'
  >;
  inputProps?: AriaInputProps;
  /**
   * When true, renders the input immediately without showing a skeleton during hydration.
   * Use this when the input doesn't need hydration protection (e.g., simple text inputs
   * that don't have complex state or need immediate interactivity).
   */
  disableSkeleton?: boolean;
}
