import type { Meta, StoryObj } from '@storybook/react';
import { Time } from './Time';
import type { TimeProps } from './Time.types';
import { TimezoneProvider } from '../Timezone';

type Story = StoryObj<typeof Time>;

/**
 * The "server"/configured zone is a fixed business example (Pacific); the
 * "local" zone is YOUR actual browser timezone — exactly what the app detects
 * via the `displayTimezone` cookie — so `<Time local>` shows your real local
 * time and differs from the configured zone (unless you're in it). Storybook is
 * client-only, so reading the live browser zone here is safe — no SSR/hydration
 * concern (which is why the static ui-docs page uses fixed example zones instead).
 */
const INSTANT = '2026-06-10T19:53:00Z';

const SERVER_TZ = 'America/Los_Angeles';
const VIEWER_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * `<Time>` reads the configured ("server") timezone and the viewer's ("local")
 * timezone from `TimezoneProvider`. In the app the provider is fed by the
 * server-resolved `displayTimezone` (server) and the viewer's cookie (local).
 */
const meta: Meta<typeof Time> = {
  component: Time,
  decorators: [
    (StoryComponent) => (
      <TimezoneProvider timezone={SERVER_TZ} viewerTimezone={VIEWER_TZ}>
        <StoryComponent />
      </TimezoneProvider>
    ),
  ],
};

export default meta;

/** Interactive playground — toggle `local`/`showZone` and the Intl format options. */
export const Example: Story = {
  argTypes: {
    local: { control: 'boolean' },
    showZone: { control: 'boolean' },
    weekday: { options: [undefined, 'short', 'long'], control: 'select' },
    year: { options: [undefined, '2-digit', 'numeric'], control: 'select' },
    month: {
      options: [undefined, 'numeric', '2-digit', 'short', 'long'],
      control: 'select',
    },
    day: { options: [undefined, 'numeric', '2-digit'], control: 'select' },
    hour: { options: [undefined, 'numeric', '2-digit'], control: 'select' },
    minute: { options: [undefined, 'numeric', '2-digit'], control: 'select' },
    locale: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    children: INSTANT,
    local: false,
    showZone: true,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    locale: 'en-US',
  } as TimeProps,
};

/** Default: renders in the configured ("server") timezone — the hydration- & index-safe baseline. */
export const ServerTime: Story = {
  args: {
    children: INSTANT,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    showZone: true,
  } as TimeProps,
};

/** Opt-in: renders in the viewer's ("client") timezone via the `local` prop. */
export const LocalTime: Story = {
  args: {
    children: INSTANT,
    local: true,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    showZone: true,
  } as TimeProps,
};

/** Same instant, both modes side by side — the configured zone vs. the viewer's zone. */
export const ServerVsLocal: Story = {
  render: () => (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
      <dt className="font-bold">Server (configured)</dt>
      <dd>
        <Time
          month="long"
          day="numeric"
          year="numeric"
          hour="numeric"
          minute="2-digit"
          showZone
        >
          {INSTANT}
        </Time>
      </dd>
      <dt className="font-bold">Local (viewer)</dt>
      <dd>
        <Time
          month="long"
          day="numeric"
          year="numeric"
          hour="numeric"
          minute="2-digit"
          local
          showZone
        >
          {INSTANT}
        </Time>
      </dd>
    </dl>
  ),
};

/** Invalid/empty input renders the `fallback` (default `-`). */
export const Fallback: Story = {
  args: {
    children: '',
    fallback: '—',
  } as TimeProps,
};
