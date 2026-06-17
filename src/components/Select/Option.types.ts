import type { ItemProps } from 'react-stately';

// <Option> for the combobox is react-stately's `Item`.
export type OptionProps<T = object> = ItemProps<T>;
