import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

type Row = { name: string; price: string };

const meta: Meta<typeof Table<Row>> = { component: Table };
export default meta;
type Story = StoryObj<typeof Table<Row>>;

const rows: Row[] = [
  { name: 'Widget', price: '$9.99' },
  { name: 'Gadget', price: '$19.99' },
];

export const Example: Story = {
  args: {
    columns: [
      { id: 'name', label: 'Product' },
      {
        id: 'price',
        label: 'Price',
        renderer: (row) => <strong>{row.price}</strong>,
      },
    ],
    rows,
  },
};
