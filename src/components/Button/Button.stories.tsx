import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = { component: Button };
export default meta;
type Story = StoryObj<typeof Button>;

export const Example: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    isLoading: false,
    isDisabled: false,
  },
  argTypes: {
    variant: {
      options: [
        'solid',
        'outline',
        'ghost',
        'primary',
        'secondary',
        'tertiary',
      ],
      control: 'radio',
    },
    size: { options: ['sm', 'md', 'lg'], control: 'radio' },
    isLoading: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
};
