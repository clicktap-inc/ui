import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeFormat } from './DateTimeFormat';

const meta: Meta<typeof DateTimeFormat> = { component: DateTimeFormat };
export default meta;
type Story = StoryObj<typeof DateTimeFormat>;

export const Example: Story = {
  args: {
    children: '2026-06-16T15:30:00Z',
    dateStyle: 'medium',
    timeStyle: 'short',
    locale: 'en-US',
  },
};
