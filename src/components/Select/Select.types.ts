import type {
  ComboBoxRenderProps,
  ComboBoxProps as AriaComboBoxProps,
  ValidationResult,
  ListBoxProps,
  Key,
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

// The selection contract is a discriminated union on `selectionMode`, so
// single-select keeps its exact `selectedKey`/`onSelectionChange(Key | null)`
// types and multi-select gets `selectedKeys`/`onSelectionChange(Key[])`. The
// keys are Omit-ed from the react-aria base (which types the combobox
// single-only) and re-declared here.
type SelectSingleSelection = {
  selectionMode?: 'single';
  selectedKey?: Key | null;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key | null) => void;
};

type SelectMultipleSelection = {
  /** Multi-select is searchable-combobox only for now (button mode is single). */
  selectionMode: 'multiple';
  selectedKeys?: Iterable<Key>;
  defaultSelectedKeys?: Iterable<Key>;
  onSelectionChange?: (keys: Key[]) => void;
};

export interface SelectBaseProps<T extends object> extends Omit<
  AriaComboBoxProps<T>,
  | 'children'
  | 'selectionMode'
  | 'selectedKey'
  | 'defaultSelectedKey'
  | 'onSelectionChange'
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
    // Each <Section> group heading.
    | 'sectionHeading'
    // Multi-select: the chip row, a chip, and a chip's remove button.
    | 'tagGroup'
    | 'tag'
    | 'tagRemoveButton'
  >;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

// Public props: base + the selection contract (single | multiple).
export type SelectProps<T extends object> = SelectBaseProps<T> &
  (SelectSingleSelection | SelectMultipleSelection);
