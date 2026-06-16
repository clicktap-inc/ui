import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgressbar, LinearProgressbar } from './index';

// Two progress variants share this docs entry; LinearProgressbar drives the
// props table, the stories render both.
const meta: Meta<typeof LinearProgressbar> = { component: LinearProgressbar };
export default meta;
type Story = StoryObj<typeof LinearProgressbar>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', width: 320 }}>
      <CircularProgressbar value={60} aria-label="60 percent" />
      <div style={{ flex: 1 }}>
        <LinearProgressbar value={60} aria-label="60 percent" />
      </div>
    </div>
  ),
};

// The same control at a range of values.
export const Values: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}
    >
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <CircularProgressbar value={v} aria-label={`${v} percent`} />
          <div style={{ flex: 1 }}>
            <LinearProgressbar value={v} aria-label={`${v} percent`} />
          </div>
        </div>
      ))}
    </div>
  ),
};
