import type {
  ComboBoxRenderProps,
  ComboBoxProps as AriaComboBoxProps,
  ValidationResult,
  ListBoxProps,
} from 'react-aria-components';
import type {
  ComponentType,
  HTMLInputAutoCompleteAttribute,
  ReactNode,
} from 'react';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export type SelectSlots<T extends object> = {
  buttonIcon?: ReactNode | ((values: ComboBoxRenderProps) => ReactNode);
  loadingIcon?: ReactNode;
  listBoxComponent?: ComponentType<ListBoxProps<T>>;
};

export interface SelectProps<T extends object> extends Omit<
  AriaComboBoxProps<T>,
  'children'
> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  isLoading?: boolean;
  children: ReactNode | ((item: T) => ReactNode);
  slots?: SelectSlots<T>;
  popoverOffset?: number;
  popoverPortalContainer?: () => HTMLElement | null;
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
  autoComplete?: HTMLInputAutoCompleteAttribute;
}
