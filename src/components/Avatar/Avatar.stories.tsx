import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import type { AvatarProps } from './Avatar.types';
import { AvatarGroup } from './AvatarGroup/AvatarGroup';
import type { AvatarGroupProps } from './AvatarGroup/AvatarGroup.types';

function Layout({ children }: { children: ReactNode }) {
  return children;
}

function AvatarExample(props: AvatarProps) {
  return (
    <Layout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Avatar {...props} />
    </Layout>
  );
}

function AvatarGroupExample(props: AvatarGroupProps) {
  return (
    <Layout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AvatarGroup {...props}>
        <Avatar src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      </AvatarGroup>
    </Layout>
  );
}

type Story = StoryObj<typeof Avatar>;
type StoryGroup = StoryObj<typeof AvatarGroup>;

const meta: Meta<typeof Layout> = {
  component: Layout,
};

export default meta;

export const AvatarComponent: Story = {
  name: 'Avatar',
  render: AvatarExample,
  argTypes: {
    src: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'radio',
    },
    showFallback: {
      control: 'boolean',
    },
    radius: {
      options: ['sm', 'md', 'lg', 'none', 'full'],
      control: 'radio',
    },
    isBordered: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    isFocusable: {
      control: 'boolean',
    },
  },
  args: {
    src: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    name: 'Avatar',
    size: 'md',
    showFallback: false,
    radius: 'full',
    isBordered: false,
    isDisabled: false,
    isFocusable: false,
  },
};
export const AvatarGroupComponent: StoryGroup = {
  name: 'Avatar Group',
  render: AvatarGroupExample,
  argTypes: {
    isGrid: {
      control: 'boolean',
    },
  },
  args: {
    isGrid: false,
  },
};
