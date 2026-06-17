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
  /**
   * Select the input text on focus so a click lets you type a replacement
   * immediately. Default `true`. (rAF-deferred so a click's caret placement
   * doesn't clear the selection.)
   */
  selectTextOnFocus?: boolean;
  /**
   * Pre-focus the first filtered option on input change, so it shows
   * highlighted and Enter/Tab commit it instead of clearing the input.
   * Default `true`. Set `false` for strict "no accidental commit" behavior.
   * (Searchable mode only.)
   */
  autoFocusFirstOption?: boolean;
  /**
   * Whether the select is type-to-filter searchable.
   * - `false` (default): button-style picker — click to open, pick one.
   * - `true`: combobox — type to filter; Tab/Enter commit and Tab advances.
   * - `'auto'`: searchable once there are more than ~8 options.
   */
  searchable?: boolean | 'auto';
  classNames?: SlotsToClasses<
    | 'label'
    | 'name'
    | 'comboBoxContainer'
    | 'input'
    | 'value'
    | 'loader'
    | 'arrowButton'
    | 'description'
    | 'errorMessage'
    | 'listContainer'
    | 'list'
    // Each option row's <li>. Merged last so it wins; focus/selected/disabled
    // are exposed as data-* variants (data-[focused], data-[selected],
    // data-[disabled]) so they can be retargeted, e.g. for dark mode.
    | 'option'
  >;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}
