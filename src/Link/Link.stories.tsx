import { LinkProps } from 'react-aria-components';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Link } from './Link';

type Story = StoryObj<typeof Link>;

function Component({ children, ...props }: LinkProps) {
  return <Link {...props}>{children}</Link>;
}

const meta: Meta<typeof Link> = {
  component: Component,
};

export default meta;

export const Example: Story = {
  argTypes: {
    href: {
      control: 'text',
    },
    target: {
      options: ['_blank', '_self', '_parent', '_top'],
      control: 'select',
    },
    isDisabled: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
    rel: {
      control: 'text',
    },
    download: {
      control: 'object',
    },
    ping: {
      control: 'text',
    },
    referrerPolicy: {
      options: [
        'no-referrer',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ],
      control: 'select',
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
    onPress: {},
    onBlur: {},
    onFocus: {},
    onFocusChange: {},
    onHoverChange: {},
    onHoverEnd: {},
    onHoverStart: {},
    onKeyDown: {},
    onKeyUp: {},
    onPressChange: {},
    onPressEnd: {},
    onPressStart: {},
    onPressUp: {},
  },
  args: {
    href: '/',
    target: '_blank',
    isDisabled: false,
    autoFocus: false,
    children: 'Press me',
    onPress: action('onPress'),
    onBlur: action('onBlur'),
    onFocus: action('onFocus'),
    onFocusChange: action('onFocusChange'),
    onHoverChange: action('onHoverChange'),
    onHoverEnd: action('onHoverEnd'),
    onHoverStart: action('onHoverStart'),
    onKeyDown: action('onKeyDown'),
    onKeyUp: action('onKeyUp'),
    onPressChange: action('onPressChange'),
    onPressEnd: action('onPressEnd'),
    onPressStart: action('onPressStart'),
    onPressUp: action('onPressUp'),
  },
};
