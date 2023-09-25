import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import Button from '../button/button';
import Container from '../container/container';
import Flex from '../flex/flex';
import Grid from '../grid/grid';
import Svg from '../svg/svg';
import { defaultTheme } from '../theming/theming';
import { Card } from './card';

const StoryWrapper: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div style={{ background: defaultTheme.colors.gray[200] }}>
    <Container mx="auto">
      <div style={{ padding: defaultTheme.spacing[4] }}>{children}</div>
    </Container>
  </div>
);

export default {
  component: Card,
  title: 'Data Display/Card',
  decorators: [(Story) => <StoryWrapper>{Story()}</StoryWrapper>],
} as ComponentMeta<typeof Card>;

const StoryPlaceholder = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
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

StoryPlaceholder.displayName = 'StoryPlaceholder';

// Basic Card

const BasicTemplate: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Basic = BasicTemplate.bind({});
Basic.args = {
  children: <StoryPlaceholder height={240} />,
};
Basic.argTypes = {};
Basic.storyName = 'Basic card';

// Complex card

const ComplexCardTemplate: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <Card.Header
      background="gray-100"
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet"
      avatar={
        <img
          src="https://api.lorem.space/image/face?w=48&h=48&version=full"
          width="48"
          height="48"
          style={{
            display: 'block',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        />
      }
      actions={
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="gray-500">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </Svg>
      }
    />

    <Card.Media aspectRatio={16 / 10}>
      <img src="https://api.lorem.space/image/house?w=640&h=640&version=full" />
    </Card.Media>

    <Card.Content background="gray-100">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum
    </Card.Content>

    <Card.Footer background="gray-100">
      <Flex gap="16px" justifyContent="flex-end">
        <Button variant="outline">Share</Button>
        <Button variant="outline">Learn More</Button>
      </Flex>
    </Card.Footer>
  </Card>
);

export const ComplexCard = ComplexCardTemplate.bind({});
ComplexCard.args = {};
ComplexCard.argTypes = Basic.argTypes;
ComplexCard.storyName = 'Complex card';

// Complex card with short syntax

const ComplexShortCardTemplate: ComponentStory<typeof Card> = (args) => (
  <Card {...args} />
);

export const ComplexShortCard = ComplexShortCardTemplate.bind({});
ComplexShortCard.args = {
  title: 'Lorem ipsum',
  subtitle: 'Lorem ipsum dolor sit amet',
  media: (
    <img src="https://api.lorem.space/image/house?w=640&h=640&version=short" />
  ),
  avatar: (
    <img
      src="https://api.lorem.space/image/face?w=48&h=48&version=short"
      width="48"
      height="48"
      style={{
        display: 'block',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    />
  ),
  actions: (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="gray-500">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </Svg>
  ),
  children: (
    <span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum
    </span>
  ),
  footer: (
    <Flex gap="16px" justifyContent="flex-end">
      <Button variant="outline">Share</Button>
      <Button variant="outline">Learn More</Button>
    </Flex>
  ),
};
ComplexShortCard.argTypes = Basic.argTypes;
ComplexShortCard.storyName = 'Complex card with short syntax';

// Card grid

const CardGridTemplate: ComponentStory<typeof Card> = (args) => (
  <Grid cols={3} gap="1rem">
    {Array(6)
      .fill(null)
      .map((_, index) => (
        <Card {...args} key={index}>
          <Card.Media aspectRatio={1}>
            <img
              src={`https://api.lorem.space/image/pizza?w=640&h=640&version=${index}`}
            />
          </Card.Media>

          <Card.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Card.Content>

          <Card.Footer>
            <Flex gap="16px" justifyContent="flex-end">
              <Button variant="outline">Learn More</Button>
            </Flex>
          </Card.Footer>
        </Card>
      ))}
  </Grid>
);

export const CardGrid = CardGridTemplate.bind({});
CardGrid.args = {};
CardGrid.argTypes = Basic.argTypes;
CardGrid.storyName = 'Card grid';
