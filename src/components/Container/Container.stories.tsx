import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = { component: Container };
export default meta;
type Story = StoryObj<typeof Container>;

export const Example: Story = {
  render: (args) => (
    <Container {...args} style={{ background: '#f1f5f9', padding: 16 }}>
      Centered, max-width page container.
    </Container>
  ),
};
