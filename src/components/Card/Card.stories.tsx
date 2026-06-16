import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = { component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

export const Example: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 320 }}>
      <h3 style={{ marginTop: 0 }}>Card title</h3>
      <p style={{ marginBottom: 0 }}>Card content goes here.</p>
    </Card>
  ),
};
