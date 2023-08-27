import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs } from './breadcrumbs';

export default {
  component: Breadcrumbs,
  title: 'Data Display/Breadcrumbs',
} as ComponentMeta<typeof Breadcrumbs>;

// Basic avatar

const BasicTemplate: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args}>
    <Breadcrumbs.Item>Home</Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item>Category</Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item current>Product</Breadcrumbs.Item>
  </Breadcrumbs>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  separator: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16">
    <path d="M13,24a1,1,0,0,1-.73-.32,1,1,0,0,1,.05-1.41L19,16,12.32,9.73a1,1,0,1,1,1.36-1.46l6.68,6.25a2,2,0,0,1,0,3l-6.68,6.25A1,1,0,0,1,13,24Z" />
  </svg>,
};
// Basic.argTypes = {
//   size: {
//     control: 'select',
//     defaultValue: Avatar.defaultProps.size,
//   },
//   width: {
//     control: 'text',
//   },
//   height: {
//     control: 'text',
//   },
//   variant: {
//     control: 'select',
//     defaultValue: Avatar.defaultProps.variant,
//   },
//   state: {
//     control: 'select',
//     defaultValue: Avatar.defaultProps.state,
//   },
//   overlayX: {
//     control: 'select',
//     defaultValue: Avatar.defaultProps.overlayX,
//   },
//   overlayY: {
//     control: 'select',
//     defaultValue: Avatar.defaultProps.overlayY,
//   },
// };
Basic.storyName = 'Basic breadcrumbs';