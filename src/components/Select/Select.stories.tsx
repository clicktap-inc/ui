import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { Option } from './Option';

const meta: Meta<typeof Select> = { component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

export const Example: Story = {
  args: {
    label: 'Sort by',
    defaultSelectedKey: 'product_name',
    menuTrigger: 'focus',
  },
  render: (args) => (
    <Select {...args}>
      <Option key="product_name">Product Name</Option>
      <Option key="price">Price</Option>
      <Option key="date">Date</Option>
    </Select>
  ),
};
