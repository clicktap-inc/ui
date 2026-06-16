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

export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      label="Size"
      orientation="horizontal"
      defaultValue="m"
      description="Lay options out in a row."
    >
      <Radio value="s">Small</Radio>
      <Radio value="m">Medium</Radio>
      <Radio value="l">Large</Radio>
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup label="Shipping method" isInvalid errorMessage="Pick a method.">
      <Radio value="standard">Standard</Radio>
      <Radio value="express">Express</Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Shipping method" defaultValue="standard" isDisabled>
      <Radio value="standard">Standard</Radio>
      <Radio value="express">Express</Radio>
    </RadioGroup>
  ),
};
