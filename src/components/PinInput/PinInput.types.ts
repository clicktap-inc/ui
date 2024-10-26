import type { GroupProps, ValidationResult } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

/** @todo extend certain textfield props like name, validationBehavior and isRequired */
export interface PinInputProps extends GroupProps {
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  label?: string;
  length?: number;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (...event: any[]) => void;
  value?: string;
  isMasked?: boolean;
  isRequired?: boolean;
  type?: 'alpha' | 'alphanumeric' | 'numeric';
  validationBehavior?: 'native' | 'aria';
  classNames?: SlotsToClasses<
    'label' | 'input' | 'description' | 'error' | 'inputWrap' | 'textWrap'
  >;
}
