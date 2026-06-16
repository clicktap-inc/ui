import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgressbar, LinearProgressbar } from './index';

// Two progress variants share this docs entry; LinearProgressbar drives the
// props table, the story renders both at the same value.
const meta: Meta<typeof LinearProgressbar> = { component: LinearProgressbar };
export default meta;
type Story = StoryObj<typeof LinearProgressbar>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', width: 320 }}>
      <CircularProgressbar value={60} />
      <div style={{ flex: 1 }}>
        <LinearProgressbar value={60} />
      </div>
    </div>
  ),
};
