import type { Meta, StoryObj } from '@storybook/react';
import {
  Cart,
  Account,
  Search,
  Trash,
  Checkmark,
  Cross,
  Plus,
  Minus,
} from './index';

// `Cart` stands in for the family in the autodocs props table; the story renders
// a gallery. Icons are rendered prop-less: the set is inconsistent — some accept
// `IconProps` (className/style), others take no props — so the gallery passes
// none, which compiles for both.
const meta: Meta<typeof Cart> = { component: Cart };
export default meta;
type Story = StoryObj<typeof Cart>;

export const Gallery: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 24 }}
    >
      <Account />
      <Cart />
      <Search />
      <Trash />
      <Checkmark />
      <Cross />
      <Plus />
      <Minus />
    </div>
  ),
};
