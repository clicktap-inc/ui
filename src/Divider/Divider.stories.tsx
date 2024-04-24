import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { SeparatorProps } from 'react-aria';
import { Divider } from './Divider';
import { storybookTheme, GlobalStyle } from '../../storybook.theme';

type Story = StoryObj<typeof Divider>;

function Component(props: SeparatorProps) {
  const { orientation } = props;
  const display = orientation === 'vertical' ? 'flex' : 'block';

  return (
    <ThemeProvider theme={storybookTheme}>
      <GlobalStyle />
      <div style={{ display }}>
        <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Divider {...props} />
        <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof Divider> = {
  component: Component,
};

export default meta;

export const Example: Story = {
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: 'select',
    },
  },
  args: {
    orientation: 'horizontal',
  },
};
