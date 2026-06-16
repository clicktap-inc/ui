import type { Meta, StoryObj } from '@storybook/react';
import { TimezoneProvider, useTimezone } from './TimezoneContext';

// TimezoneProvider supplies the configured ("server") zone and the viewer's
// zone to descendants (e.g. <Time>). This consumer reads it back to show what
// the provider exposes.
function ShowZone() {
  const { timezone, viewerTimezone } = useTimezone();
  return (
    <code>
      configured: {timezone}
      {viewerTimezone ? ` · viewer: ${viewerTimezone}` : ''}
    </code>
  );
}

const meta: Meta<typeof TimezoneProvider> = { component: TimezoneProvider };
export default meta;
type Story = StoryObj<typeof TimezoneProvider>;

export const Example: Story = {
  args: { timezone: 'America/New_York', viewerTimezone: 'America/Los_Angeles' },
  render: (args) => (
    <TimezoneProvider {...args}>
      <ShowZone />
    </TimezoneProvider>
  ),
};
