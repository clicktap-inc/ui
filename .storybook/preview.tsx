import React from 'react';
import type { Preview } from '@storybook/react';
import { LinkProvider } from '../src/components/Link';
import { TimezoneProvider } from '../src/components/Timezone';
import './tailwind.css';

// Global decorators provide the context that several components depend on
// (e.g. <Time> needs TimezoneProvider, <Link> needs LinkProvider) so stories
// render without each one re-declaring providers.
//
// `timezone` (the "server"/configured zone) is fixed to a business example;
// `viewerTimezone` is the actual browser zone — mirroring what
// `TimezoneCookieSync` detects in the real app — so `<Time local>` shows YOUR
// real local time and differs from the configured zone (unless you're in it).
const VIEWER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <LinkProvider config={{}}>
        <TimezoneProvider
          timezone="America/Los_Angeles"
          viewerTimezone={VIEWER_TIMEZONE}
        >
          <Story />
        </TimezoneProvider>
      </LinkProvider>
    ),
  ],
};

export default preview;
