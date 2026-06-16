import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGate } from './FeatureGate';
import { PermissionsProvider } from './PermissionsProvider';

// FeatureGate reads permission context (PermissionsProvider, JWT-derived). With
// no token the viewer lacks the permission, so the story shows the gated
// "permission required" fallback rather than the wrapped content.
const meta: Meta<typeof FeatureGate> = { component: FeatureGate };
export default meta;
type Story = StoryObj<typeof FeatureGate>;

export const Example: Story = {
  args: { permission: 'reports:view', featureName: 'Reports' },
  render: (args) => (
    <PermissionsProvider accessToken={null}>
      <FeatureGate {...args}>
        <p>
          Unlocked feature content (shown when the role grants the permission).
        </p>
      </FeatureGate>
    </PermissionsProvider>
  ),
};
