import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ToggleButtonProps } from 'react-aria-components';
import { ToggleButton } from './ToggleButton';

type Story = StoryObj<typeof ToggleButton>;

function Component({ children, ...props }: ToggleButtonProps) {
  return <ToggleButton {...props}>{children}</ToggleButton>;
}

const meta: Meta<typeof ToggleButton> = {
  component: Component,
};

export default meta;

export const Example: Story = {
  argTypes: {
    variant: {
      options: ['solid', 'outline', 'ghost'],
      control: 'select',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    isSelected: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    defaultSelected: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'radio' },
    },
    excludeFromTabOrder: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'object',
    },
    style: {
      control: 'object',
    },
    onChange: {},
    onPress: {},
    onPressStart: {},
    onPressEnd: {},
    onPressChange: {},
    onPressUp: {},
    onFocus: {},
    onBlur: {},
    onFocusChange: {},
    onKeyDown: {},
    onKeyUp: {},
  },
  args: {
    variant: 'solid',
    size: 'md',
    isSelected: false,
    isDisabled: false,
    autoFocus: false,
    defaultSelected: false,
    excludeFromTabOrder: false,
    type: 'button',
    children: 'Press me',
    onPress: action('onPress'),
    onPressStart: action('onPressStart'),
    onPressEnd: action('onPressEnd'),
    onPressChange: action('onPressChange'),
    onPressUp: action('onPressUp'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
    onFocusChange: action('onFocusChange'),
    onKeyDown: action('onKeyDown'),
    onKeyUp: action('onKeyUp'),
  },
};
