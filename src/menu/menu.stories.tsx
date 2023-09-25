import { StoryFn, Meta } from '@storybook/react';
import { Menu } from './menu';

export default {
  component: Menu,
  title: 'Components/Menu',
} as Meta<typeof Menu>;

const BasicTemplate: StoryFn<typeof Menu> = (args) => <Menu />;

export const Basic = BasicTemplate.bind({});
Basic.args = {};

Basic.argTypes = {};
