'use client';

import { type ReactNode } from 'react';
import { usePermissions, useAccountPermissions } from './PermissionsProvider';
import { UpgradePrompt, type UpgradePromptProps } from './UpgradePrompt';
import {
  PermissionRequired,
  type PermissionRequiredProps,
} from './PermissionRequired';

export interface FeatureGateProps {
  /** The permission code to check */
  permission: string;
  /** Human-readable feature name for error messages */
  featureName?: string;
  /** Content to show when user has permission */
  children: ReactNode;
  /** Custom content to show when account needs to upgrade (subscription-based) */
  upgradeContent?: ReactNode;
  /** Custom icon for the upgrade prompt */
  upgradeIcon?: UpgradePromptProps['icon'];
  /** URL to navigate to for subscription management */
  upgradeUrl?: UpgradePromptProps['upgradeUrl'];
  /** Callback when "Manage Subscription" is clicked in upgrade prompt */
  onManageSubscription?: UpgradePromptProps['onManageSubscription'];
  /** Custom content to show when user's role lacks permission */
  permissionContent?: ReactNode;
  /** Custom icon for the permission required prompt */
  permissionIcon?: PermissionRequiredProps['icon'];
}

/**
 * Gates content based on user and account permissions.
 *
 * Permission checks happen in two stages:
 * 1. Account level - Does the account's subscription include this feature?
 *    If not, show UpgradePrompt.
 * 2. User level - Does the user's role grant this permission?
 *    If not, show PermissionRequired.
 *
 * While permissions are loading (null), children are shown (assume access).
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FeatureGate permission="reports:view" featureName="Reports">
 *   <ReportsPage />
 * </FeatureGate>
 *
 * // With upgrade URL
 * <FeatureGate
 *   permission="analytics:advanced"
 *   featureName="Advanced Analytics"
 *   upgradeUrl="/settings/subscription"
 * >
 *   <AnalyticsDashboard />
 * </FeatureGate>
 *
 * // With custom prompts
 * <FeatureGate
 *   permission="analytics:advanced"
 *   featureName="Advanced Analytics"
 *   upgradeContent={<CustomUpgradeBanner />}
 * >
 *   <AnalyticsDashboard />
 * </FeatureGate>
 * ```
 */
export function FeatureGate({
  permission,
  featureName,
  children,
  upgradeContent,
  upgradeIcon,
  upgradeUrl,
  onManageSubscription,
  permissionContent,
  permissionIcon,
}: FeatureGateProps) {
  const userPermissions = usePermissions();
  const accountPermissions = useAccountPermissions();

  // While permissions not yet available from JWT, show children (assume access)
  if (userPermissions === null || accountPermissions === null) {
    return children;
  }

  const isAvailableToAccount = accountPermissions.includes(permission);
  const hasPermission = userPermissions.includes(permission);

  // Account doesn't have the feature - show upgrade prompt
  if (!isAvailableToAccount) {
    return (
      <UpgradePrompt
        featureName={featureName}
        icon={upgradeIcon}
        upgradeUrl={upgradeUrl}
        onManageSubscription={onManageSubscription}
      >
        {upgradeContent}
      </UpgradePrompt>
    );
  }

  // User's role doesn't have permission - show permission required
  if (!hasPermission) {
    return (
      <PermissionRequired featureName={featureName} icon={permissionIcon}>
        {permissionContent}
      </PermissionRequired>
    );
  }

  // User has permission - show the content
  return children;
}

export default FeatureGate;
