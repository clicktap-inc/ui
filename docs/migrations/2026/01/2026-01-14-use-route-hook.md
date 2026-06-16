# useRoute Hook Migration

**Date:** 2026-01-14
**Affects:** `@clicktap/ui`, `apps/frontend`
**Breaking:** No (additive, but recommended migration)
**Classification:** IMPROVEMENT


## Dependencies

*None*

## Summary

Introduces a centralized route configuration system with the `useRoute` hook for generating URLs. Handles dynamic params, protected route redirects, and login-with-return patterns automatically.

## New Files

- `libs/ui/src/hooks/useRoute/` - Hook and RouteProvider
- `apps/frontend/config/routes.ts` - Centralized route definitions

## Provider Setup

Add `RouteProviderWithAuth` inside your `AuthProvider`:

```tsx
import { RouteProvider } from '@clicktap/ui/hooks/useRoute';
import { useAuth } from '../state/auth/AuthProvider';

function RouteProviderWithAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  return <RouteProvider config={{ isLoggedIn }}>{children}</RouteProvider>;
}

// In provider tree:
<AuthProvider actor={authActor}>
  <RouteProviderWithAuth>
    {children}
  </RouteProviderWithAuth>
</AuthProvider>
```

## Migration Patterns

### Static Routes

```tsx
// Before
<Link href="/cart">Cart</Link>

// After
import { useRoute } from '@clicktap/ui/hooks/useRoute';
import { Routes } from '../config/routes';

const cartUrl = useRoute(Routes.cart.index);
<Link href={cartUrl}>Cart</Link>
```

### Dynamic Routes

```tsx
// Before
<Link href={`/account/orders/${orderId}`}>View Order</Link>

// After
const orderUrl = useRoute(Routes.account.orders.view, { orderId });
<Link href={orderUrl}>View Order</Link>
```

### Protected Routes

Protected routes automatically redirect through auth when logged out:

```tsx
// Before
const ordersUrl = isLoggedIn
  ? '/account/orders'
  : `/account/authenticate?redirect=${encodeURIComponent('/account/orders')}`;

// After
const ordersUrl = useRoute(Routes.account.orders.index);
// Logged in:  '/account/orders'
// Logged out: '/account/authenticate?redirect=%2Faccount%2Forders'
```

### Login with Return

```tsx
// Before
const loginUrl = `/account/authenticate?redirect=${encodeURIComponent(pathname)}`;
const loginUrl = Routes.account.loginAndReturn(Routes.cart.index);

// After
const loginUrl = useRoute(Routes.account.authenticate, null, { returnHere: true });
```

### router.push

```tsx
// Before
router.push('/checkout');
router.push(`/checkout/success/${orderId}`);

// After
const checkoutUrl = useRoute(Routes.checkout.index);
router.push(checkoutUrl);

const successUrl = useRoute(Routes.checkout.success, { orderId });
router.push(successUrl);
```

## Adding New Routes

Add to `apps/frontend/config/routes.ts`:

```tsx
const RawRoutes = {
  // Static route
  newPage: {
    path: '/new-page',
    isProtected: false,
  },

  // Nested with dynamic param
  feature: {
    index: {
      path: '/feature',
      isProtected: false,
    },
    details: {
      path: '/feature/:featureId',
      isProtected: true,
    },
  },
} as const;
```

## Deprecated

- `Routes.account.loginAndReturn()` - Use `useRoute(route, null, { returnHere: true })`
- `isProtectedRoute(pathname)` - Use `route.isProtected` directly
- Direct `.path` access - Use `useRoute()` for all URL generation
