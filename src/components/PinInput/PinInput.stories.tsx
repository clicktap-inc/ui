import type { Meta, StoryObj } from '@storybook/react';
import { PinInput } from './PinInput';

const meta: Meta<typeof PinInput> = { component: PinInput };
export default meta;
type Story = StoryObj<typeof PinInput>;

export const Example: Story = {
  args: {
    label: 'Verification code',
    length: 6,
    type: 'numeric',
    isMasked: false,
  },
  argTypes: {
    type: { options: ['alpha', 'alphanumeric', 'numeric'], control: 'radio' },
    isMasked: { control: 'boolean' },
  },
};
