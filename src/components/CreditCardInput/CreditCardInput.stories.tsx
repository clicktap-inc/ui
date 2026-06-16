import type { Meta, StoryObj } from '@storybook/react';
import { CreditCardInput } from './CreditCardInput';

const meta: Meta<typeof CreditCardInput> = { component: CreditCardInput };
export default meta;
type Story = StoryObj<typeof CreditCardInput>;

export const Example: Story = {
  args: { label: 'Card number', placeholder: '1234 5678 9012 3456' },
};
