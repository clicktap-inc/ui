import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { RadioGroup } from '../RadioGroup/RadioGroup';

const meta: Meta<typeof Radio> = { component: Radio };
export default meta;
type Story = StoryObj<typeof Radio>;

export const Example: Story = {
  args: { value: 'a', children: 'Option A' },
  render: (args) => (
    <RadioGroup label="Choose one" defaultValue="a">
      <Radio {...args} />
      <Radio value="b">Option B</Radio>
    </RadioGroup>
  ),
};
