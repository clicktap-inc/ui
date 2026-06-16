import type { Meta, StoryObj } from '@storybook/react';
import { NumberFormat } from './NumberFormat';

const meta: Meta<typeof NumberFormat> = { component: NumberFormat };
export default meta;
type Story = StoryObj<typeof NumberFormat>;

export const Example: Story = {
  args: {
    children: 1234.56,
    style: 'currency',
    currency: 'USD',
    locale: 'en-US',
  },
  argTypes: {
    style: {
      options: ['decimal', 'currency', 'percent', 'unit'],
      control: 'radio',
    },
  },
};
