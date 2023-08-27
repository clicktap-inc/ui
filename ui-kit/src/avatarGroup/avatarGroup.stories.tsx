import { ComponentStory, ComponentMeta } from '@storybook/react';
import Flex from '../flex/flex';

import { AvatarGroup } from './avatarGroup';
import { Avatar } from '../avatar/avatar';

export default {
  component: AvatarGroup,
  title: 'Data Display/AvatarGroup',
} as ComponentMeta<typeof AvatarGroup>;

const avatarSizes = ['xs', 'sm', 'md'] as const;

// Basic AvatarGroup

const BasicTemplate: ComponentStory<typeof AvatarGroup> = (args) => (
  <Flex justifyContent="center">
    <AvatarGroup {...args}>
      {Array(10)
        .fill(null)
        .map((_, avatarKey) => (
          <Avatar
            size="lg"
            key={avatarKey}
            image={
              <img
                src={`//api.lorem.space/image/face?w=150&h=150&version=${avatarKey}`}
                alt="Avatar example"
              />
            }
          />
        ))}
    </AvatarGroup>
  </Flex>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
Basic.argTypes = {
  direction: {
    control: 'select',
    defaultValue: AvatarGroup.defaultProps.direction,
  },
  stackedFrom: {
    control: 'select',
    defaultValue: AvatarGroup.defaultProps.stackedFrom,
  },
};
Basic.storyName = 'Basic AvatarGroup';

// AvatarGroup stacked bottom to top

const AvatarGroupBottomTemplate: ComponentStory<typeof AvatarGroup> = (
  args
) => (
  <Flex justifyContent="center" alignItems="flex-end" gap="3rem" wrap="wrap">
    {Object.entries(avatarSizes).map(([avatarGroupKey, size]) => (
      <AvatarGroup {...args} key={avatarGroupKey}>
        {Array(4)
          .fill(null)
          .map((_, avatarKey) => (
            <Avatar
              size={size}
              key={avatarKey}
              image={
                <img
                  src={`//api.lorem.space/image/face?w=150&h=150&version=${avatarKey}`}
                  alt="Avatar example"
                />
              }
            />
          ))}
      </AvatarGroup>
    ))}
  </Flex>
);

export const AvatarGroupBottom = AvatarGroupBottomTemplate.bind({});
AvatarGroupBottom.args = {
  stackedFrom: 'bottom',
};
AvatarGroupBottom.argTypes = Basic.argTypes;
AvatarGroupBottom.storyName = 'AvatarGroup stacked bottom to top';

// AvatarGroup stacked top to bottom

export const AvatarGroupTop = AvatarGroupBottomTemplate.bind({});
AvatarGroupTop.args = {
  stackedFrom: 'top',
};
AvatarGroupTop.argTypes = Basic.argTypes;
AvatarGroupTop.storyName = 'AvatarGroup stacked top to bottom';

// Vertical AvatarGroup

export const AvatarGroupVertical = AvatarGroupBottomTemplate.bind({});
AvatarGroupVertical.args = {
  direction: 'vertical',
};
AvatarGroupVertical.argTypes = Basic.argTypes;
AvatarGroupVertical.storyName = 'Vertical AvatarGroup';
