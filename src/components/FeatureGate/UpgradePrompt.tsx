'use client';

import { type ReactNode } from 'react';
import { Button } from '../Button';
import { Link } from '../Link';
import { GemIcon } from '../Icon';

export interface UpgradePromptProps {
  /** Human-readable feature name for error message */
  featureName?: string;
  /** Custom icon to render instead of default */
  icon?: ReactNode;
  /** Custom content to render instead of default */
  children?: ReactNode;
  /** URL to navigate to for subscription management */
  upgradeUrl?: string;
  /** Callback when "Manage Subscription" is clicked (alternative to upgradeUrl) */
  onManageSubscription?: () => void;
}

/**
 * Shown when the account's subscription doesn't include a feature.
 * Prompts user to upgrade their subscription.
 *
 * @example
 * ```tsx
 * // With upgrade URL
 * <UpgradePrompt
 *   featureName="Advanced Analytics"
 *   upgradeUrl="/settings/subscription"
 * />
 *
 * // With callback
 * <UpgradePrompt
 *   featureName="Advanced Analytics"
 *   onManageSubscription={() => router.push('/settings/subscription')}
 * />
 *
 * // Custom icon
 * <UpgradePrompt
 *   featureName="Reports"
 *   icon={<DiamondIcon size={24} className="text-purple-500" />}
 *   upgradeUrl="/upgrade"
 * />
 *
 * // Custom content
 * <UpgradePrompt>
 *   <CustomUpgradeCard />
 * </UpgradePrompt>
 * ```
 */
export function UpgradePrompt({
  featureName,
  icon,
  children,
  upgradeUrl,
  onManageSubscription,
}: UpgradePromptProps) {
  if (children) {
    return children;
  }

  return (
    <div className="border border-slate-200 rounded-lg bg-white">
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
          {icon ?? <GemIcon size={24} />}
        </div>
        <p className="text-lg font-medium text-slate-600 mb-2">
          Upgrade Your Account
        </p>
        <p className="text-sm text-slate-500 text-center max-w-md">
          {featureName
            ? `Access to ${featureName} requires a premium subscription.`
            : 'This feature requires a premium subscription.'}{' '}
          Upgrade your account to unlock this and other powerful features.
        </p>
        {upgradeUrl ? (
          <Link
            href={upgradeUrl}
            className="mt-8 inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Manage Subscription
          </Link>
        ) : (
          <Button
            variant="solid"
            className="mt-8"
            onPress={onManageSubscription}
          >
            Manage Subscription
          </Button>
        )}
      </div>
    </div>
  );
}

export default UpgradePrompt;
