import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import type { BadgeProps } from './Badge.types';
import { Avatar } from '../Avatar/Avatar';

type Story = StoryObj<typeof Badge>;

function Component(props: BadgeProps) {
  return (
    <Badge {...props}>
      <Avatar name="Regular" radius="md" />
    </Badge>
  );
}

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

export const Example: Story = {
  render: Component,
  argTypes: {
    content: {
      control: 'text',
    },
    variant: {
      options: ['shadow', 'flat', 'solid', 'faded'],
      control: 'radio',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'radio',
    },
    placement: {
      options: ['top-right', 'bottom-right', 'bottom-left', 'top-left'],
      control: 'radio',
    },
    shape: {
      options: ['circle', 'rectangle'],
      control: 'radio',
    },
    isInvisible: {
      control: 'boolean',
    },
    isOneChar: {
      control: 'boolean',
    },
    isDot: {
      control: 'boolean',
    },
    disableAnimation: {
      control: 'boolean',
    },
    showOutline: {
      control: 'boolean',
    },
  },
  args: {
    content: '5',
    variant: 'solid',
    size: 'md',
    placement: 'top-right',
    shape: 'rectangle',
    isInvisible: false,
    isOneChar: false,
    isDot: false,
    disableAnimation: false,
    showOutline: true,
  },
};
