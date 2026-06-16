import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = { component: Slider };
export default meta;
type Story = StoryObj<typeof Slider>;

export const Example: Story = {
  args: { label: 'Volume', defaultValue: 50, showOutput: true },
};

// Two thumbs: pass an array `defaultValue` and `thumbLabels` for a range.
export const Range: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Slider
        label="Price range"
        defaultValue={[20, 80]}
        showOutput
        thumbLabels={['min', 'max']}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Slider label="Disabled" defaultValue={40} showOutput isDisabled />
    </div>
  ),
};
