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
