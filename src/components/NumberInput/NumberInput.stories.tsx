import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = { component: NumberInput };
export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Example: Story = {
  args: { label: 'Quantity', defaultValue: 1, minValue: 0 },
};
