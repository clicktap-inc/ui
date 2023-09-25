import { ComponentStory, ComponentMeta } from '@storybook/react';
import Flex from '../flex/flex';

import { Avatar } from './avatar';

export default {
  component: Avatar,
  title: 'Data Display/Avatar',
} as ComponentMeta<typeof Avatar>;

function OverlayExample() {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        background: 'red',
      }}
    />
  );
}

// Basic avatar

const BasicTemplate: ComponentStory<typeof Avatar> = (args) => (
  <Flex justifyContent="center">
    <Avatar {...args} />
  </Flex>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  image: (
    <img src="//api.lorem.space/image/face?w=150&h=150" alt="Avatar example" />
  ),
};
Basic.argTypes = {
  size: {
    control: 'select',
    defaultValue: Avatar.defaultProps.size,
  },
  width: {
    control: 'text',
  },
  height: {
    control: 'text',
  },
  variant: {
    control: 'select',
    defaultValue: Avatar.defaultProps.variant,
  },
  state: {
    control: 'select',
    defaultValue: Avatar.defaultProps.state,
  },
  overlayX: {
    control: 'select',
    defaultValue: Avatar.defaultProps.overlayX,
  },
  overlayY: {
    control: 'select',
    defaultValue: Avatar.defaultProps.overlayY,
  },
};
Basic.storyName = 'Basic avatar';

// Circular avatars

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const AvatarsTemplate: ComponentStory<typeof Avatar> = (args) => (
  <Flex justifyContent="center" alignItems="flex-end" gap="3rem">
    {sizes.map((size) => (
      <Avatar {...args} size={size} key={size} />
    ))}
  </Flex>
);

export const CircularAvatars = AvatarsTemplate.bind({});
CircularAvatars.args = Basic.args;
CircularAvatars.argTypes = Basic.argTypes;
CircularAvatars.storyName = 'Circular avatars';

// Rounded avatars

export const RoundedAvatars = AvatarsTemplate.bind({});
RoundedAvatars.args = {
  ...Basic.args,
  variant: 'rounded',
};
RoundedAvatars.argTypes = Basic.argTypes;
RoundedAvatars.storyName = 'Rounded avatars';

// Square avatars

export const SquareAvatars = AvatarsTemplate.bind({});
SquareAvatars.args = {
  ...Basic.args,
  variant: 'square',
};
SquareAvatars.argTypes = Basic.argTypes;
SquareAvatars.storyName = 'Square avatars';

// Avatar with fallback

export const FallbackAvatar = BasicTemplate.bind({});
FallbackAvatar.args = {
  image: <img src="//some-bad-url" alt="Avatar example" />,
  fallback: (
    <img src="//api.lorem.space/image/face?w=150&h=150" alt="Avatar example" />
  ),
};
FallbackAvatar.argTypes = Basic.argTypes;
FallbackAvatar.storyName = 'Avatar with fallback';

// Avatars with overlay

const AvatarsOverlayTemplate: ComponentStory<typeof Avatar> = (args) => (
  <Flex justifyContent="center" alignItems="flex-end" gap="3rem">
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="left"
      overlayY="top"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="left"
      overlayY="center"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="left"
      overlayY="bottom"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="center"
      overlayY="top"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="center"
      overlayY="center"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="center"
      overlayY="bottom"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="right"
      overlayY="top"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="right"
      overlayY="center"
    />
    <Avatar
      {...args}
      overlay={<OverlayExample />}
      overlayX="right"
      overlayY="bottom"
    />
  </Flex>
);

export const AvatarsOverlay = AvatarsOverlayTemplate.bind({});
AvatarsOverlay.args = Basic.args;
AvatarsOverlay.argTypes = Basic.argTypes;
AvatarsOverlay.storyName = 'Avatars with overlay';

// Avatars with icon

export const AvatarsIcon = AvatarsTemplate.bind({});
AvatarsIcon.args = {};
AvatarsIcon.argTypes = Basic.argTypes;
AvatarsIcon.storyName = 'Avatars with icon';

// Avatars with custom icon

export const AvatarsCustomIcon = AvatarsTemplate.bind({});
AvatarsCustomIcon.args = {
  icon: (
    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="#090">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  ),
};
AvatarsCustomIcon.argTypes = Basic.argTypes;
AvatarsCustomIcon.storyName = 'Avatars with custom icon';

// Avatars with text

export const AvatarsText = AvatarsTemplate.bind({});
AvatarsText.args = {
  text: 'JS',
  size: '2xl',
};
AvatarsText.argTypes = Basic.argTypes;
AvatarsText.storyName = 'Avatars with text';
