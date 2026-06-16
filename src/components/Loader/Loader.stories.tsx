import type { Meta, StoryObj } from '@storybook/react';
import { CircularEasing, Pulse } from './index';

// Loader ships two spinner variants. CircularEasing stands in for the autodocs
// props table; the story renders both.
const meta: Meta<typeof CircularEasing> = { component: CircularEasing };
export default meta;
type Story = StoryObj<typeof CircularEasing>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <CircularEasing />
      <Pulse />
    </div>
  ),
};
