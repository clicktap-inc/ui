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

export const Variants: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}
    >
      <PinInput label="4-digit code" length={4} type="numeric" />
      <PinInput label="6-digit, masked" length={6} type="numeric" isMasked />
      <PinInput label="Alphanumeric" length={5} type="alphanumeric" />
    </div>
  ),
};
