import type { Meta, StoryObj } from '@storybook/react';
import { LinkAsButton } from './LinkAsButton';

const meta: Meta<typeof LinkAsButton> = { component: LinkAsButton };
export default meta;
type Story = StoryObj<typeof LinkAsButton>;

export const Example: Story = {
  args: {
    children: 'Continue',
    href: '#',
    variant: 'primary',
    size: 'md',
    isLoading: false,
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
  },
};
