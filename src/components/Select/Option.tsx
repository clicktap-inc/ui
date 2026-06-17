// Option for <Select> (the combobox). It is react-stately's `Item` — a
// collection descriptor consumed by `useComboBoxState`, NOT a rendered element
// (the combobox renders each item itself). Usage is unchanged:
//   <Select><Option key="x">Label</Option></Select>
// For <DropdownSelect> (the button-style select), use `DropdownOption` instead.
import { Item } from 'react-stately';

export const Option = Item;

export default Option;
