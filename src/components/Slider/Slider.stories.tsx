import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = { component: Slider };
export default meta;
type Story = StoryObj<typeof Slider>;

export const Example: Story = {
  args: { label: 'Volume', defaultValue: 50, showOutput: true },
};
