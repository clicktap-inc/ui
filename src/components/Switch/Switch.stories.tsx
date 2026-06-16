import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = { component: Switch };
export default meta;
type Story = StoryObj<typeof Switch>;

export const Example: Story = {
  args: { children: 'Enable notifications' },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Switch defaultSelected={false}>Off</Switch>
      <Switch defaultSelected>On</Switch>
      <Switch isDisabled>Disabled</Switch>
      <Switch isDisabled defaultSelected>
        Disabled on
      </Switch>
    </div>
  ),
};
