'use client';

import { jwtDecode } from 'jwt-decode';
import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

type Permissions = string[];

interface AccountInfo {
  id: string | null;
  name: string | null;
}

interface JwtPayload {
  // Standard OAuth2 claims
  aud?: string; // Audience
  jti?: string; // JWT ID
  iat?: number; // Issued at
  nbf?: number; // Not before
  exp?: number; // Expiration
  sub?: string; // Subject

  // Custom claims
  scopes?: string[]; // OAuth2 API scopes
  permissions?: string[]; // User's effective permissions (role-based)
  account_permissions?: string[]; // Account's available permissions (subscription-based)
  website_id?: string; // Tenant context
  account_id?: string; // User's current account UUID
  account_name?: string; // User's current account name
  account_enabled?: boolean; // Account status (disabled accounts can't access app)
}

const PermissionsContext = createContext<Permissions | null>(null);
const AccountPermissionsContext = createContext<Permissions | null>(null);
const AccountContext = createContext<AccountInfo>({ id: null, name: null });

/**
 * Returns the user's effective permissions (role-based).
 * Returns null while permissions are being loaded from JWT.
 */
export const usePermissions = () => {
  return useContext(PermissionsContext);
};

/**
 * Returns the account's available permissions (what the subscription grants).
 * Use this to determine if a feature requires an upgrade vs just a role change.
 * Returns null while permissions are being loaded from JWT.
 */
export const useAccountPermissions = () => {
  return useContext(AccountPermissionsContext);
};

/**
 * Returns the current account info (id and name) from the JWT.
 */
export const useAccount = () => {
  return useContext(AccountContext);
};

export interface PermissionsProviderProps {
  accessToken: string | null;
}

/**
 * Provider that decodes JWT token and provides permission context to children.
 *
 * @example
 * ```tsx
 * <PermissionsProvider accessToken={token}>
 *   <FeatureGate permission="reports:view">
 *     <ReportsPage />
 *   </FeatureGate>
 * </PermissionsProvider>
 * ```
 */
export function PermissionsProvider({
  accessToken,
  children,
}: PropsWithChildren<PermissionsProviderProps>) {
  const { permissions, accountPermissions, account } = useMemo(() => {
    if (!accessToken) {
      return {
        permissions: null,
        accountPermissions: null,
        account: { id: null, name: null },
      };
    }

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      return {
        permissions: decoded.permissions ?? null,
        accountPermissions: decoded.account_permissions ?? null,
        account: {
          id: decoded.account_id ?? null,
          name: decoded.account_name ?? null,
        },
      };
    } catch (error) {
      console.error('Failed to decode JWT token:', error);
      return {
        permissions: null,
        accountPermissions: null,
        account: { id: null, name: null },
      };
    }
  }, [accessToken]);

  return (
    <PermissionsContext.Provider value={permissions}>
      <AccountPermissionsContext.Provider value={accountPermissions}>
        <AccountContext.Provider value={account}>
          {children}
        </AccountContext.Provider>
      </AccountPermissionsContext.Provider>
    </PermissionsContext.Provider>
  );
}

export interface IsAllowedToProps {
  /** Permissions to check */
  to: string[];
  /** If true, renders children when user does NOT have the permissions */
  isRestricted?: boolean;
}

/**
 * Conditional render helper based on permissions.
 * Renders children if user has any of the specified permissions.
 * If isRestricted is true, renders children if user does NOT have any of the permissions.
 *
 * @example
 * ```tsx
 * <IsAllowedTo to={['admin:manage']}>
 *   <AdminPanel />
 * </IsAllowedTo>
 *
 * <IsAllowedTo to={['premium:feature']} isRestricted>
 *   <UpgradePrompt />
 * </IsAllowedTo>
 * ```
 */
export function IsAllowedTo({
  to,
  isRestricted = false,
  children,
}: PropsWithChildren<IsAllowedToProps>): React.ReactNode {
  const permissions = usePermissions();

  const shouldRender = to?.some((per) =>
    isRestricted ? !permissions?.includes(per) : permissions?.includes(per)
  );

  return shouldRender ? children : null;
}

export default PermissionsProvider;
