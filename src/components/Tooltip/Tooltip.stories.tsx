import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = { component: Tooltip };
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
  args: { content: 'Helpful hint', placement: 'top', showArrow: true },
  argTypes: {
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: 'radio',
    },
    showArrow: { control: 'boolean' },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
