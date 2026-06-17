'use client';

import {
  Children,
  forwardRef,
  isValidElement,
  type ForwardedRef,
  type ReactNode,
} from 'react';
import { ButtonSelect } from './ButtonSelect';
import { ComboBoxSelect } from './ComboBoxSelect';
import { Section } from './Option';
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
  // Count options, descending into <Section> groups so the auto-threshold
  // reflects the number of options, not the number of groups.
  let count = 0;
  Children.forEach(props.children, (child) => {
    if (isValidElement(child) && child.type === Section) {
      const sectionChildren = (child.props as { children?: ReactNode })
        .children;
      count += Children.count(sectionChildren);
    } else {
      count += 1;
    }
  });
  return count;
}

function SelectInner<T extends object>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  // Multi-select is combobox-only (button mode / useSelectState is single-only),
  // so 'multiple' forces the searchable path regardless of `searchable`.
  const searchable =
    props.selectionMode === 'multiple' ||
    (props.searchable === 'auto'
      ? optionCount(props) > AUTO_SEARCH_THRESHOLD
      : Boolean(props.searchable));

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
