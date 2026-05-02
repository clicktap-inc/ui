# `buildPdpUrl` Utility — `@clicktap/ui/utils/buildPdpUrl`

**Date:** 2026-05-01
**Affects:** `@clicktap/ui/utils/buildPdpUrl` — new export
**Classification:** IMPROVEMENT
**Breaking:** No (additive)

## Dependencies

*None.*

## Summary

Adds `buildPdpUrl(canonicalUrl, typeOptions)` to `@clicktap/ui/utils/buildPdpUrl`. Encodes a configurable item's variant selections onto its PDP canonical URL as `?attributeCode=optionCode` pairs, matching `ProductTypeResolver.writeSelectionsToUrl` so deep-linking from a cart/order item lands on the exact variant.

## Why

Cart and order item rows hold both a canonical URL (e.g. `/everyday-backpack`) and a list of selected attributes (e.g. `color: orange`, `size: m`). Linking with just the canonical URL drops the variant context — the customer lands on the PDP with no swatch pre-selected and has to re-pick. Encoding the selections onto the link mirrors what the PDP itself writes back to the URL on swatch change, so navigating into a PDP from a cart/order row produces the same URL as if the user had configured the PDP themselves.

The helper was originally inlined under `apps/frontend/components/Checkout/Success/Items/buildPdpUrl.ts`, used only by the order-success page. Promoting it to `@clicktap/ui` makes it reusable from the cart drawer (and any future consumer that pairs a canonical URL with a `typeOptions`-shaped attribute list).

## Public API

```ts
import { buildPdpUrl } from '@clicktap/ui/utils/buildPdpUrl';
```

```ts
/**
 * Append configurable-product variant selections to a PDP canonical URL as
 * `?attributeCode=optionCode` pairs (e.g. `?color=black`).
 *
 * Accepts the structural shape that any cart-item / order-item / quote-item
 * `typeOptions` produces on the configurable case.
 *
 * Returns the URL unchanged when:
 *   - the URL is null/empty,
 *   - the item isn't configurable (no attributes), or
 *   - the existing URL already carries a query string (we don't merge —
 *     the item's own variant context is authoritative, and bailing keeps
 *     caller intent clear).
 */
function buildPdpUrl(
  canonicalUrl: string | null | undefined,
  typeOptions: unknown,
): string | null;
```

The `typeOptions` parameter is intentionally typed `unknown` and read structurally as `{ attributes?: Array<{ attribute?: { code? }, option?: { code? } }> }`. This lets the same helper accept both `OrderItemTypeOptions` and `QuoteItemTypeOptions` (and any other GraphQL union with the same shape) without forcing the lib to import the consumer's generated types.

## Behavior summary

| Input | Output |
|---|---|
| `(null, ...)` | `null` |
| `('', ...)` | `null` |
| `('/foo', null)` | `'/foo'` |
| `('/foo', { attributes: [] })` | `'/foo'` |
| `('/foo', { attributes: [{ attribute: { code: 'color' }, option: { code: 'red' } }] })` | `'/foo?color=red'` |
| `('/foo', { attributes: [{ color }, { size }] })` | `'/foo?color=red&size=m'` |
| `('/foo?bar=1', { attributes: [...] })` | `'/foo?bar=1'` (URL has a query — bail rather than merge) |

## Pattern for Consumers

Use it wherever a cart/order item row links to its PDP and you want the variant pre-selected:

```tsx
import { Link } from '@clicktap/ui/components/Link';
import { buildPdpUrl } from '@clicktap/ui/utils/buildPdpUrl';

function CartItemRow({ item }: { item: QuoteItem }) {
  const pdpUrl = buildPdpUrl(item.product.canonicalUrl, item.typeOptions) ?? '';
  return (
    <Link href={pdpUrl}>
      {item.name}
    </Link>
  );
}
```

The function is structural, so `item.typeOptions` doesn't need to be cast — pass it directly.

## Migration Steps

This is purely additive — existing code keeps compiling. To adopt:

### 1. Bump `@clicktap/ui`

```bash
pnpm up @clicktap/ui
```

Minimum version: **next minor after the release that ships this migration**.

### 2. Replace any inlined copies with the shared util

Search consumer projects for inlined copies that predate this migration:

```bash
grep -rn 'buildPdpUrl' apps/ libs/ --include='*.ts' --include='*.tsx'
```

Switch each call site to:

```ts
import { buildPdpUrl } from '@clicktap/ui/utils/buildPdpUrl';
```

If the consumer project had its own typed-to-`OrderItemTypeOptions` (or any other concrete) signature, the structural `unknown` parameter accepts it without any cast change at the call site — the existing arguments compile as-is.

### 3. (Optional) Wire it into cart/order link components

Anywhere a cart/order row currently links via `product.canonicalUrl` directly, swap to `buildPdpUrl(product.canonicalUrl, typeOptions)`. Make sure your GraphQL selection actually fetches `canonicalUrl` and the `typeOptions { ... attributes { attribute { code }, option { code } } }` block — without those, the helper returns the URL unchanged and the variant won't pre-select.

### Verification

- **Behavior**: open a cart drawer (or order success page) for a configurable product with attributes set, click the item link. The PDP should load with the swatches matching the variant pre-selected.
- **Typecheck**: `nx run <app>:typecheck` → no errors.

## Files Changed

| File | Change |
|---|---|
| `libs/ui/src/utils/buildPdpUrl.ts` | New — structural helper |

## References

- PDP encoding source of truth: `apps/frontend/components/Product/ProductType/.../ProductTypeResolver.writeSelectionsToUrl`
