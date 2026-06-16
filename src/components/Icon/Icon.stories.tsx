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

// The icon set shares one prop shape (IconProps: className/style). `Cart` stands
// in for the family in the autodocs props table; the story renders a gallery.
const meta: Meta<typeof Cart> = { component: Cart };
export default meta;
type Story = StoryObj<typeof Cart>;

export const Gallery: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 24 }}
    >
      <Account {...args} />
      <Cart {...args} />
      <Search {...args} />
      <Trash {...args} />
      <Checkmark {...args} />
      <Cross {...args} />
      <Plus {...args} />
      <Minus {...args} />
    </div>
  ),
};
