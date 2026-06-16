import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = { component: Pagination };
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Example: Story = {
  args: { total: 10, initialPage: 1, showControls: true },
};

export const Variations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pagination total={5} initialPage={2} />
      <Pagination total={10} initialPage={5} showControls />
      <Pagination total={20} initialPage={10} showControls isCompact />
    </div>
  ),
};
