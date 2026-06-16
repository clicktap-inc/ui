import type { Meta, StoryObj } from '@storybook/react';
import { PasswordCheck } from './PasswordCheck';

const meta: Meta<typeof PasswordCheck> = { component: PasswordCheck };
export default meta;
type Story = StoryObj<typeof PasswordCheck>;

export const Example: Story = {
  args: { value: 'Passw0rd!', variant: 'default' },
  argTypes: {
    variant: {
      options: ['default', 'short', 'requirements'],
      control: 'radio',
    },
  },
};
