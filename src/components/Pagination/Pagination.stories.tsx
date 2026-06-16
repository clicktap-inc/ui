import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = { component: Pagination };
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Example: Story = {
  args: { total: 10, initialPage: 1, showControls: true },
};
