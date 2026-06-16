# Environment Utilities from @clicktap/ui

**Date:** 2026-02-16
**Affects:** All files importing `isDevelopment` / `isProduction` from local `utils/env`
**Classification:** IMPROVEMENT
**Breaking:** No

## Dependencies

- [Payment Method Error Handling](../../../../../../apps/frontend/docs/migrations/2026/01/2026-01-14-payment-error-handling.md) — introduced the local `utils/env.ts`

## Summary

The `isDevelopment` and `isProduction` boolean constants have been moved from the frontend's local `utils/env.ts` into `@clicktap/ui/utils/env`, making them available to all apps consuming `@clicktap/ui`. The local file has been deleted.

## Problem

The `isDevelopment` / `isProduction` utility was defined locally in `apps/frontend/utils/env.ts`. Other apps (admin, future storefronts) that need the same pattern would have to duplicate it. Moving it into the shared UI library centralises the definition.

Additionally, the `@clicktap/ui` Vite build was replacing `process.env.NODE_ENV` with `"production"` at library build time, which meant any `NODE_ENV`-based guards inside the UI library (e.g., `console.warn` in the Image component) were dead-code-eliminated before consumers ever saw them. A `define` override in `libs/ui/vite.config.ts` now preserves `process.env.NODE_ENV` so the **consuming app's** bundler handles the replacement.

## Changes

### Vite library build fix

The `@clicktap/ui` Vite config now includes:

```ts
define: {
  'process.env.NODE_ENV': 'process.env.NODE_ENV',
},
```

This prevents Vite from baking `"production"` into the published bundle, so environment-guarded code (like dev-only `console.warn`) works correctly at the consumer's build time.

**Source:** `libs/ui/vite.config.ts`

### New shared utility

```ts
// @clicktap/ui/utils/env
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
```

**Source:** `libs/ui/src/utils/env.ts`

### Import change

**Before:**
```ts
import { isDevelopment } from '../utils/env';
import { isDevelopment } from '../../../utils/env';
import { isDevelopment } from '../../../../../utils/env';
```

**After:**
```ts
import { isDevelopment } from '@clicktap/ui/utils/env';
```

### Files changed

| File | Change |
|------|--------|
| `apps/frontend/utils/env.ts` | Deleted |
| `providers/CybersourceMicroformV2Provider.tsx` | Import updated |
| `components/Checkout/ExpressCheckout/PaypalButton.tsx` | Import updated |
| `components/Checkout/ExpressCheckout/GooglePayButton.tsx` | Import updated |
| `components/Checkout/ExpressCheckout/ApplePayButton.tsx` | Import updated |
| `components/Checkout/ExpressCheckout/AmazonPayButton.tsx` | Import updated |
| `components/Checkout/Step/Review/CheckoutButton/ApplePayCheckoutButton.tsx` | Import updated |
| `components/Checkout/Step/Review/CheckoutButton/GooglePayCheckoutButton.tsx` | Import updated |
| `components/Checkout/Step/Review/CheckoutButton/PaypalCheckoutButton.tsx` | Import updated |
| `components/Checkout/Step/Review/CheckoutButton/AmazonCheckoutButton.tsx` | Import updated |
| `components/Checkout/Step/Payment/Authorizenet/AuthorizenetPaymentMethod.tsx` | Import updated |

## Migration Steps

1. Update `@clicktap/ui` to the version containing this change.
2. Find all imports from the local `utils/env`:
   ```bash
   grep -r "from.*utils/env" apps/frontend/
   ```
3. Replace each import path with `@clicktap/ui/utils/env`.
4. Delete `apps/frontend/utils/env.ts`.
5. Run typecheck to confirm no broken imports.

## Migration Checklist

- [ ] Update `@clicktap/ui` to latest
- [ ] Replace all `utils/env` imports with `@clicktap/ui/utils/env`
- [ ] Delete `apps/frontend/utils/env.ts`
- [ ] Run typecheck: `nx run frontend:typecheck`
