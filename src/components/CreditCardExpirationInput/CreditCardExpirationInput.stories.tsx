import type { Meta, StoryObj } from '@storybook/react';
import { CreditCardExpirationInput } from './CreditCardExpirationInput';

const meta: Meta<typeof CreditCardExpirationInput> = {
  component: CreditCardExpirationInput,
};
export default meta;
type Story = StoryObj<typeof CreditCardExpirationInput>;

export const Example: Story = {
  args: { label: 'Expiration', placeholder: 'MM/YY' },
};
