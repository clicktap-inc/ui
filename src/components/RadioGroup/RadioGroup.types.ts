import type { RadioGroupProps as AriaRadioGroupProps } from 'react-aria-components';

export interface RadioGroupProps extends AriaRadioGroupProps {
  label?: string;
  description?: string;
  errorMessage?: string;
}
