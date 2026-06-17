'use client';

import { Children, forwardRef, type ForwardedRef } from 'react';
import { ButtonSelect } from './ButtonSelect';
import { ComboBoxSelect } from './ComboBoxSelect';
import type { SelectProps } from './Select.types';

// One public <Select>. `searchable` picks the implementation:
//   - false (default): button-style picker (useSelect) — click to open, pick one
//   - true: combobox (useComboBox) — type to filter, Tab commits + advances
//   - 'auto': searchable once there are more than AUTO_SEARCH_THRESHOLD options
// Both modes share the same react-stately Item collection, the same <Option>,
// the same inline (non-overlay) listbox, and the same styling.

const AUTO_SEARCH_THRESHOLD = 8;

function optionCount<T extends object>(props: SelectProps<T>): number {
  if (props.items) {
    return [...props.items].length;
  }
  if (typeof props.children === 'function') {
    return Number.POSITIVE_INFINITY;
  }
  return Children.count(props.children);
}

function SelectInner<T extends object>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const searchable =
    props.searchable === 'auto'
      ? optionCount(props) > AUTO_SEARCH_THRESHOLD
      : Boolean(props.searchable);

  if (searchable) {
    return <ComboBoxSelect ref={ref} {...props} />;
  }
  return <ButtonSelect {...props} />;
}

interface SelectComponent {
  <T extends object>(
    props: SelectProps<T> & { ref?: ForwardedRef<HTMLInputElement> },
  ): JSX.Element;
}

export const Select = forwardRef(SelectInner) as SelectComponent;

export default Select;
