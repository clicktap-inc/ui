'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useRouteConfig } from './RouteContext';

/**
 * Route definition with path template and metadata.
 */
export type RouteConfig = {
  readonly path: string;
  readonly isProtected: boolean;
  readonly name?: string;
};

/**
 * Default path to the authentication page.
 */
const DEFAULT_AUTH_PATH = '/account/authenticate';

/**
 * Replace :param placeholders in path with values from params object.
 */
export function resolveParams(
  path: string,
  params?: Record<string, string> | null,
): string {
  if (!params) return path;

  return path.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, paramName: string) => {
    const value = params[paramName];
    if (value === undefined) {
      throw new Error(
        `useRoute: missing required param "${paramName}" for path "${path}"`,
      );
    }
    return encodeURIComponent(value);
  });
}

/**
 * Check if path contains :param placeholders.
 */
function hasParams(path: string): boolean {
  return /:([a-zA-Z_][a-zA-Z0-9_]*)/.test(path);
}

/**
 * Build a path from a route config, replacing :param placeholders with values.
 * Use this in event handlers and other non-component contexts where hooks can't be used.
 *
 * Unlike useRoute, this does NOT handle auth redirects - it just builds the path.
 * Use this for internal navigation within an authenticated app.
 *
 * @param route - Route config object from Routes
 * @param params - Object with param values for dynamic routes
 * @returns The resolved path string
 *
 * @example
 * // In a row click handler
 * const handleRowClick = (row) => {
 *   router.push(buildPath(Routes.order.view, { id: row.id }));
 * };
 */
export function buildPath(
  route: RouteConfig,
  params?: Record<string, string> | null,
): string {
  return resolveParams(route.path, params);
}

/**
 * Options for useRoute hook.
 */
type UseRouteOptions = {
  /**
   * When true, appends ?redirect=<current-pathname> to the URL.
   * Use this for "login with return" pattern where you want to link TO
   * the login page and redirect back to the current page after auth.
   *
   * @example
   * // On cart page: link to login, return to cart after
   * const loginUrl = useRoute(Routes.account.authenticate, null, { returnHere: true });
   * // '/account/authenticate?redirect=%2Fcart'
   */
  returnHere?: boolean;
};

/**
 * Generate an href from a route config, handling:
 * - Path param replacement (:orderId -> actual value)
 * - Auth redirect for protected routes when not logged in
 * - returnHere option for login-with-return pattern
 *
 * @param route - Route config object from Routes (e.g., Routes.checkout.success)
 * @param params - Object with param values for dynamic routes
 * @param options - Additional options like returnHere
 * @returns The resolved href string
 *
 * @example
 * // Static route
 * const href = useRoute(Routes.cart.index);
 * // '/cart'
 *
 * @example
 * // Dynamic route
 * const href = useRoute(Routes.checkout.success, { orderId: 'abc123' });
 * // '/checkout/success/abc123'
 *
 * @example
 * // Protected route when not logged in
 * const href = useRoute(Routes.account.orders.index);
 * // '/account/authenticate?redirect=%2Faccount%2Forders'
 *
 * @example
 * // Login with return to current page (login-with-return pattern)
 * const loginUrl = useRoute(Routes.account.authenticate, null, { returnHere: true });
 * // '/account/authenticate?redirect=%2Fcart' (if on /cart)
 */
export function useRoute(
  route: RouteConfig,
  params?: Record<string, string> | null,
  options?: UseRouteOptions,
): string {
  const pathname = usePathname();
  const { isLoggedIn } = useRouteConfig();

  return useMemo(() => {
    const { path, isProtected, name = 'unknown' } = route;

    // Validate params are provided for dynamic routes
    if (hasParams(path) && !params) {
      throw new Error(
        `useRoute: params required for route "${name}" with path "${path}"`,
      );
    }

    // Resolve any :param placeholders
    const resolvedPath = resolveParams(path, params);

    // If returnHere is true, append current pathname as redirect (login-with-return pattern)
    if (options?.returnHere) {
      return `${resolvedPath}?redirect=${encodeURIComponent(pathname)}`;
    }

    // If protected and not logged in, redirect through auth
    if (isProtected && !isLoggedIn) {
      return `${DEFAULT_AUTH_PATH}?redirect=${encodeURIComponent(
        resolvedPath,
      )}`;
    }

    return resolvedPath;
  }, [route, params, options?.returnHere, pathname, isLoggedIn]);
}
