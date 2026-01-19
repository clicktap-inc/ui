# useRoute

A hook for generating URLs from route configuration objects with automatic handling of dynamic params, protected routes, and login-with-return patterns.

## Features

- **Dynamic Parameters**: Replace `:param` placeholders with actual values
- **Protected Routes**: Auto-redirect through auth when user is logged out
- **Login with Return**: Append current pathname as redirect query param

## Usage

```tsx
import { useRoute } from '@clicktap/ui/hooks/useRoute';
import { Routes } from '../config/routes';

// Static route
const cartUrl = useRoute(Routes.cart.index);
// → '/cart'

// Dynamic route with params
const orderUrl = useRoute(Routes.account.orders.view, { orderId: '123' });
// → '/account/orders/123'

// Protected route (auto-redirects through auth when logged out)
const dashboardUrl = useRoute(Routes.account.dashboard);
// Logged in:  → '/account/dashboard'
// Logged out: → '/account/authenticate?redirect=%2Faccount%2Fdashboard'

// Login with return to current page
const loginUrl = useRoute(Routes.account.authenticate, null, { returnHere: true });
// On /cart: → '/account/authenticate?redirect=%2Fcart'
```

## Requirements

This hook uses `RouteProvider` to determine login status. Wrap your app with `RouteProvider` and pass the `isLoggedIn` config:

```tsx
import { RouteProvider } from '@clicktap/ui/hooks/useRoute';
import { useAuth } from '../state/auth/AuthProvider';

// Bridge auth state to RouteProvider
function RouteProviderWithAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  return <RouteProvider config={{ isLoggedIn }}>{children}</RouteProvider>;
}

// In your providers tree (inside AuthProvider)
<AuthProvider actor={authActor}>
  <RouteProviderWithAuth>
    {children}
  </RouteProviderWithAuth>
</AuthProvider>
```

## Protected Route Handling

Routes with `isProtected: true` automatically redirect through authentication when the user is logged out:

```tsx
// Route config: { path: '/account/orders', isProtected: true }
const ordersUrl = useRoute(Routes.account.orders.index);

// Logged out: '/account/authenticate?redirect=%2Faccount%2Forders'
// Logged in:  '/account/orders'
```

## Login with Return

For login links on unprotected pages (cart, checkout) that should return to the current page after auth:

```tsx
// On the cart page
const loginUrl = useRoute(Routes.account.authenticate, null, { returnHere: true });
// → '/account/authenticate?redirect=%2Fcart'
```

## API

```typescript
function useRoute(
  route: RouteConfig,
  params?: Record<string, string> | null,
  options?: { returnHere?: boolean }
): string
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `route` | `RouteConfig` | Route object from `Routes` config |
| `params` | `Record<string, string> \| null` | Values for dynamic route segments. Pass `null` when using options without params. |
| `options.returnHere` | `boolean` | Appends `?redirect=<current-pathname>` to the URL |

### RouteConfig

```typescript
type RouteConfig = {
  readonly path: string;      // URL path with optional :param placeholders
  readonly isProtected: boolean;  // true = requires authentication
  readonly name?: string;     // Optional, for debugging
};
```

## Exports

```tsx
export { useRoute, type RouteConfig } from './useRoute';
export { RouteProvider, useRouteConfig, type RouteProviderConfig } from './RouteContext';
```
