import type { Meta, StoryObj } from '@storybook/react';
import { NumberFormat } from './NumberFormat';

const meta: Meta<typeof NumberFormat> = { component: NumberFormat };
export default meta;
type Story = StoryObj<typeof NumberFormat>;

export const Example: Story = {
  args: {
    children: 1234.56,
    style: 'currency',
    currency: 'USD',
    locale: 'en-US',
  },
  argTypes: {
    style: {
      options: ['decimal', 'currency', 'percent', 'unit'],
      control: 'radio',
    },
  },
};

// The same value rendered through each `Intl.NumberFormat` style.
export const Formats: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}
    >
      <div>
        <NumberFormat style="currency" currency="USD">
          {1234.5}
        </NumberFormat>{' '}
        — currency (USD)
      </div>
      <div>
        <NumberFormat style="currency" currency="EUR" locale="de-DE">
          {1234.5}
        </NumberFormat>{' '}
        — currency (EUR, de-DE)
      </div>
      <div>
        <NumberFormat style="percent">{0.426}</NumberFormat> — percent
      </div>
      <div>
        <NumberFormat style="decimal" minimumFractionDigits={2}>
          {1234.5}
        </NumberFormat>{' '}
        — decimal (2 fraction digits)
      </div>
      <div>
        <NumberFormat style="unit" unit="kilometer">
          {42}
        </NumberFormat>{' '}
        — unit
      </div>
    </div>
  ),
};
