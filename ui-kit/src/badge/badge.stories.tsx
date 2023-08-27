import { ComponentStory, ComponentMeta } from '@storybook/react';
import Flex from '../flex/flex';
import { Palette } from '../palette/palette';
import { Badge } from './badge';

const sizes = ['sm', 'md', 'lg'] as const;
const colors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
];
const shapes = ['circle', 'round', 'square'] as const;

export default {
  component: Badge,
  title: 'Elements/Badge',
} as ComponentMeta<typeof Badge>;

const BasicTemplate: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}>Badge</Badge>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  bg: 'gray-100',
  color: 'gray-800',
  disabled: false,
  shape: 'circle',
  size: 'sm',
  state: 'idle',
};
Basic.argTypes = {
  shape: {
    control: 'select',
  },
  state: {
    control: 'select',
  },
  size: {
    control: 'select',
  },
};

// Sizes

const SizesTemplate: ComponentStory<typeof Badge> = (args) => (
  <Flex direction="column" gap="1rem">
    {sizes.map((size) => (
      <Flex key={size} gap="1rem" justifyContent="center">
        {colors.map((color) => (
          <Badge
            {...args}
            key={color}
            size={size}
            color={`${color}-800` as Palette}
            bg={`${color}-100` as Palette}
          >
            Badge
          </Badge>
        ))}
      </Flex>
    ))}
  </Flex>
);

export const Sizes = SizesTemplate.bind({});
Sizes.args = Basic.args;
Sizes.argTypes = {
  ...Basic.argTypes,
  bg: {
    control: 'none',
  },
  color: {
    control: 'none',
  },
  size: {
    control: 'none',
  },
};
Sizes.storyName = 'Sizes';

// Shapes

const ShapesTemplate: ComponentStory<typeof Badge> = (args) => (
  <Flex direction="column" gap="1rem">
    {shapes.map((shape) => (
      <Flex key={shape} gap="1rem" justifyContent="center">
        {colors.map((color) => (
          <Badge
            {...args}
            key={color}
            shape={shape}
            color={`${color}-800` as Palette}
            bg={`${color}-100` as Palette}
          >
            Badge
          </Badge>
        ))}
      </Flex>
    ))}
  </Flex>
);

export const Shapes = ShapesTemplate.bind({});
Shapes.args = Basic.args;
Shapes.argTypes = {
  ...Basic.argTypes,
  bg: {
    control: 'none',
  },
  color: {
    control: 'none',
  },
  shape: {
    control: 'none',
  },
};
Shapes.storyName = 'Shapes';

// WithDots

const WithDotsTemplate: ComponentStory<typeof Badge> = (args) => (
  <Flex direction="column" gap="3rem">
    {shapes.map((shape) => (
      <Flex direction="column" gap="1rem" key={shape}>
        {sizes.map((size) => (
          <Flex key={size} gap="1rem" justifyContent="center">
            {colors.map((color) => (
              <Badge
                {...args}
                key={color}
                size={size}
                shape={shape}
                color={`${color}-800` as Palette}
                bg={`${color}-100` as Palette}
              >
                <Badge.Dot color={`${color}-400` as Palette} />
                Badge
              </Badge>
            ))}
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
);

export const WithDots = WithDotsTemplate.bind({});
WithDots.args = Basic.args;
WithDots.argTypes = {
  ...Basic.argTypes,
  bg: {
    control: 'none',
  },
  color: {
    control: 'none',
  },
  shape: {
    control: 'none',
  },
  size: {
    control: 'none',
  },
};
WithDots.storyName = 'With dots';
