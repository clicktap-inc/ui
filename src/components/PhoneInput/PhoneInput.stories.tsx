import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from './PhoneInput';

const meta: Meta<typeof PhoneInput> = { component: PhoneInput };
export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Example: Story = {
  args: { label: 'Phone number', defaultCountry: 'us' },
};
