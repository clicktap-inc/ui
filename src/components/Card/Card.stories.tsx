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

// Card is a `flex flex-col` container — bring your own borders/padding/content.
export const ProductCard: Story = {
  render: () => (
    <Card
      className="border border-solid border-slate-200 rounded-lg p-4 gap-1"
      style={{ maxWidth: 280 }}
    >
      <div className="h-32 w-full rounded-md bg-slate-100" />
      <h3 className="font-semibold text-base mt-3 mb-0">Wireless Headphones</h3>
      <p className="text-sm text-slate-600 my-1">
        Over-ear, noise cancelling, 30h battery.
      </p>
      <span className="font-bold">$149.99</span>
    </Card>
  ),
};
