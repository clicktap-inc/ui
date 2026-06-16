import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = { component: Skeleton };
export default meta;
type Story = StoryObj<typeof Skeleton>;

// Skeleton is an unsized `animate-pulse` box — it renders nothing until you give
// it width/height (and a shape) via className. These are the common loading
// placeholder shapes: text lines, a button, a circular avatar.
export const Shapes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}
    >
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  ),
};

// A realistic content placeholder: avatar + heading/subtext, a media block, and
// body lines — the shape you'd show while a card loads.
export const CardPlaceholder: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
};

// The bare primitive — size it with the className control.
export const Single: Story = {
  args: { className: 'w-48 h-6 rounded' },
};
