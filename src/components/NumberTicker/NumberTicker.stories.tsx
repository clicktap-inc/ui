import type { Meta, StoryObj } from '@storybook/react';
import { NumberTicker } from './NumberTicker';

const meta: Meta<typeof NumberTicker> = { component: NumberTicker };
export default meta;
type Story = StoryObj<typeof NumberTicker>;

export const Example: Story = {
  args: { value: 1234, precision: 0 },
};
