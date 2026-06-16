import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = { component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const Example: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    description: 'We never share your email.',
    isDisabled: false,
  },
};

export const States: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}
    >
      <Input label="Default" placeholder="Type here" />
      <Input
        label="With description"
        description="Helper text shown below the field."
        placeholder="Type here"
      />
      <Input
        label="Invalid"
        isInvalid
        errorMessage="This field is required."
        placeholder="Type here"
      />
      <Input label="Disabled" isDisabled placeholder="Can't edit" />
    </div>
  ),
};
