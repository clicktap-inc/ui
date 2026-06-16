import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeFormat } from './DateTimeFormat';

const meta: Meta<typeof DateTimeFormat> = { component: DateTimeFormat };
export default meta;
type Story = StoryObj<typeof DateTimeFormat>;

const SAMPLE = '2026-06-16T15:30:00Z';

export const Example: Story = {
  args: {
    children: SAMPLE,
    dateStyle: 'medium',
    timeStyle: 'short',
    locale: 'en-US',
  },
};

// The same instant through several `Intl.DateTimeFormat` option sets.
export const Formats: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}
    >
      <div>
        <DateTimeFormat dateStyle="full">{SAMPLE}</DateTimeFormat> — dateStyle
        full
      </div>
      <div>
        <DateTimeFormat dateStyle="medium" timeStyle="short">
          {SAMPLE}
        </DateTimeFormat>{' '}
        — date + time
      </div>
      <div>
        <DateTimeFormat timeStyle="medium">{SAMPLE}</DateTimeFormat> — time only
      </div>
      <div>
        <DateTimeFormat month="long" year="numeric">
          {SAMPLE}
        </DateTimeFormat>{' '}
        — month + year
      </div>
      <div>
        <DateTimeFormat dateStyle="long" locale="de-DE">
          {SAMPLE}
        </DateTimeFormat>{' '}
        — localized (de-DE)
      </div>
    </div>
  ),
};
