import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from './menu';

export default {
  component: Menu,
  title: 'Components/Menu',
} as ComponentMeta<typeof Menu>;

const BasicTemplate: ComponentStory<typeof Menu> = (args) => <Menu />;

export const Basic = BasicTemplate.bind({});
Basic.args = {};

Basic.argTypes = {};
