import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';
import { Radio } from '../Radio/Radio';

const meta: Meta<typeof RadioGroup> = { component: RadioGroup };
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Example: Story = {
  args: { label: 'Shipping method', defaultValue: 'standard' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="standard">Standard</Radio>
      <Radio value="express">Express</Radio>
    </RadioGroup>
  ),
};
