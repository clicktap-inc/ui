'use client';

import { type ReactNode } from 'react';
import { LockIcon } from '../Icon';

export interface AccessDeniedProps {
  /** Custom title (defaults to "Access Denied") */
  title?: string;
  /** Custom message */
  message?: string;
  /** Custom icon to render instead of default */
  icon?: ReactNode;
  /** Custom content to render instead of default */
  children?: ReactNode;
}

/**
 * Generic access denied message component.
 * Used for 401/403 responses or when access checks fail.
 *
 * @example
 * ```tsx
 * // Default message
 * <AccessDenied />
 *
 * // Custom message
 * <AccessDenied
 *   title="Authentication Required"
 *   message="Please log in to continue."
 * />
 *
 * // Custom icon
 * <AccessDenied icon={<LockIcon size={24} className="text-red-500" />} />
 *
 * // Fully custom content
 * <AccessDenied>
 *   <CustomErrorPage />
 * </AccessDenied>
 * ```
 */
export function AccessDenied({
  title,
  message,
  icon,
  children,
}: AccessDeniedProps) {
  if (children) {
    return children;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
        {icon ?? <LockIcon size={24} className="text-red-500" />}
      </div>
      <h1 className="text-xl font-semibold text-slate-900 mb-2">
        {title ?? 'Access Denied'}
      </h1>
      <p className="text-sm text-slate-600 text-center max-w-md">
        {message ??
          "You don't have permission to access this resource. If you believe this is an error, please contact support."}
      </p>
    </div>
  );
}

export default AccessDenied;
