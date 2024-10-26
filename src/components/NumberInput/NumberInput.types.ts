import type { ReactNode } from 'react';
import type { NumberFieldProps, ValidationResult } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface NumberInputProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  slots?: {
    decrementIcon?: ReactNode;
    incrementIcon?: ReactNode;
  };
  classNames?: SlotsToClasses<
    | 'label'
    | 'input'
    | 'description'
    | 'error'
    | 'incrementBtn'
    | 'decrementBtn'
    | 'group'
  >;
}
