import type {
  ComboBoxRenderProps,
  ComboBoxProps as AriaComboBoxProps,
  ValidationResult,
} from 'react-aria-components';
import type { Key, ReactNode } from 'react';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export type ComboBoxPopoverAnimationState = 'unmounted' | 'hidden' | 'visible';

export type SelectSlots = {
  buttonIcon?: ReactNode | ((values: ComboBoxRenderProps) => ReactNode);
  loadingIcon?: ReactNode;
};

export interface SelectProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  key?: Key | null;
  isLoading?: boolean;
  children: ReactNode | ((item: T) => ReactNode);
  slots?: SelectSlots;
  popoverOffset?: number;
  popoverPortalContainer?: Element;
  classNames?: SlotsToClasses<
    | 'label'
    | 'name'
    | 'comboBoxContainer'
    | 'input'
    | 'loader'
    | 'arrowButton'
    | 'description'
    | 'errorMessage'
    | 'listContainer'
    | 'list'
  >;
}
