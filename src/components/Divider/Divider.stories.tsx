import type { Meta, StoryObj } from '@storybook/react';
import { SeparatorProps } from 'react-aria';
import { Divider } from './Divider';

type Story = StoryObj<typeof Divider>;

function Component(props: SeparatorProps) {
  const { orientation } = props;
  const display = orientation === 'vertical' ? 'flex' : 'block';

  return (
    <div style={{ display }}>
      <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Divider {...props} />
      <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
    </div>
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
