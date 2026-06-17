// Option for <Select>. It is react-stately's `Item` — a collection descriptor
// consumed by the select state, NOT a rendered element (the select renders each
// item itself). Usage:
//   <Select><Option key="x">Label</Option></Select>
import { Item, Section } from 'react-stately';

export const Option = Item;

// Option group. react-stately's `Section` — a collection descriptor like Item:
//   <Select>
//     <Section title="Group A"><Option key="x">…</Option></Section>
//   </Select>
export { Section };

export default Option;
