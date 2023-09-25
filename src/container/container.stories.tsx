import { StoryFn, Meta } from '@storybook/react';
import styled from 'styled-components';
import { Container } from './container';
// import { defaultTheme } from '../theming/theming';
// import { ThemeProvider } from 'styled-components';

export default {
  component: Container,
  title: 'Layout/Container',
} as Meta<typeof Container>;

const Placeholder = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid rgba(161, 161, 161, 1);
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(
      to top left,
      rgba(191, 191, 191, 0) 0%,
      rgba(191, 191, 191, 0) calc(50% - 0.8px),
      rgba(191, 191, 191, 1) 50%,
      rgba(191, 191, 191, 0) calc(50% + 0.8px),
      rgba(191, 191, 191, 0) 100%
    ),
    linear-gradient(
      to top right,
      rgba(191, 191, 191, 0) 0%,
      rgba(191, 191, 191, 0) calc(50% - 0.8px),
      rgba(191, 191, 191, 1) 50%,
      rgba(191, 191, 191, 0) calc(50% + 0.8px),
      rgba(191, 191, 191, 0) 100%
    );
`;

const BasicTemplate: StoryFn<typeof Container> = (args) => (
  <Container {...args}>
    <Placeholder />
  </Container>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
Basic.argTypes = {};

const CenterTemplate: StoryFn<typeof Container> = (args) => (
  <Container {...args} mx="auto">
    <Placeholder />
  </Container>
);

export const Center = CenterTemplate.bind({});
Center.args = Basic.args;
Center.argTypes = Basic.argTypes;
