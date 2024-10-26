import type {
  CheckboxProps as UiCheckboxProps,
  CheckboxRenderProps,
} from 'react-aria-components';
import type { ReactNode } from 'react';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface CheckboxSlots {
  control?: ReactNode | ((values: CheckboxRenderProps) => ReactNode);
}

export interface CheckboxProps extends UiCheckboxProps {
  slots?: CheckboxSlots;
  classNames?: SlotsToClasses<'control'>;
}
