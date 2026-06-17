import type {
  ItemProps,
  SectionProps as AriaSectionProps,
} from 'react-stately';

// <Option> for the combobox is react-stately's `Item`.
export type OptionProps<T = object> = ItemProps<T>;

// <Section> option group is react-stately's `Section`.
export type SectionProps<T = object> = AriaSectionProps<T>;
