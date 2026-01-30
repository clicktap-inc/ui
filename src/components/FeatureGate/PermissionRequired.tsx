'use client';

import { type ReactNode } from 'react';
import { LockIcon } from '../Icon';

export interface PermissionRequiredProps {
  /** Human-readable feature name for error message */
  featureName?: string;
  /** Custom icon to render instead of default */
  icon?: ReactNode;
  /** Custom content to render instead of default */
  children?: ReactNode;
}

/**
 * Shown when the user's role doesn't grant permission for a feature.
 * The account has the feature, but this specific user needs role access.
 *
 * @example
 * ```tsx
 * // Default message
 * <PermissionRequired featureName="Reports" />
 *
 * // Custom icon
 * <PermissionRequired
 *   featureName="Reports"
 *   icon={<ShieldIcon size={24} className="text-yellow-500" />}
 * />
 *
 * // Custom content
 * <PermissionRequired>
 *   <ContactAdminForm />
 * </PermissionRequired>
 * ```
 */
export function PermissionRequired({
  featureName,
  icon,
  children,
}: PermissionRequiredProps) {
  if (children) {
    return children;
  }

  return (
    <div className="border border-slate-200 rounded-lg bg-white">
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
          {icon ?? <LockIcon size={24} />}
        </div>
        <p className="text-lg font-medium text-slate-600 mb-2">
          Permission Required
        </p>
        <p className="text-sm text-slate-500 text-center max-w-md">
          {featureName
            ? `You don't have permission to access ${featureName}.`
            : "You don't have permission to access this feature."}{' '}
          Please contact your account administrator to request access.
        </p>
      </div>
    </div>
  );
}

export default PermissionRequired;
