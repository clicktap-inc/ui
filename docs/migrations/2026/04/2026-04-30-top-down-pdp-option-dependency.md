# Top-Down PDP Option Dependency — `@clicktap/ui/utils/variantOptions`

**Date:** 2026-04-30
**Affects:** New utility module `@clicktap/ui/utils/variantOptions` (ships generic `filterAvailableOptions`, `findVariant`, `getDownstreamAxisCodes`)
**Classification:** IMPROVEMENT
**Breaking:** No (additive)

## Dependencies

- Builds on the per-axis selection model used in [`apps/frontend/.../2026-04-24-pdp-configurable-selector-ux.md`](../../../../../apps/frontend/docs/migrations/2026/04/2026-04-24-pdp-configurable-selector-ux.md). The previous symmetric filter lived in the frontend app; that logic now lives here in generic, reusable form. See [`apps/frontend/.../2026-04-30-top-down-pdp-option-dependency.md`](../../../../../apps/frontend/docs/migrations/2026/04/2026-04-30-top-down-pdp-option-dependency.md) ↔ for the frontend-side migration steps that adopt the new utilities and switch to top-down semantics.

## Summary

Adds a small reusable module — `@clicktap/ui/utils/variantOptions` — for any consumer that builds a configurable-PDP variant picker. Three pure functions:

1. **`filterAvailableOptions(variants, selections, axes, axisCode)`** — top-down: returns option codes selectable for `axisCode` given only the *upstream* selections (axes earlier in `axes`). Downstream selections never constrain.
2. **`findVariant(variants, selections)`** — first variant whose attributes match every non-empty selection; matches by option `code` or `id`.
3. **`getDownstreamAxisCodes(axes, axisCode)`** — axis codes after `axisCode` in `axes`. Useful for clearing dependent selections when an upstream axis changes.

All three are generic (`<V extends VariantLike>`) and operate on a minimal structural shape so consumers don't have to flatten their domain types. Pure, no React dependency, no side effects.

## Why top-down

Symmetric filtering — selecting any axis filters every other axis equally — is what most early implementations do. It feels coherent until the user wants to change a higher-priority pick: every dependent dropdown is now scoped by their previous lower picks, and they can't re-explore the upstream space without manually clearing each lower selection first.

Top-down inverts the relationship: the *first* axis is always fully open, the *second* is filtered by the first, and so on. Changing the first axis is free. The cost is that the consumer must clear lower selections when an upstream changes (their value may not exist in the new scope) — `getDownstreamAxisCodes` makes that mechanical.

This module ships the filter logic only. The selection-state mechanics (clearing downstream when upstream changes, URL sync, manual-clear guards) stay in the consumer app since those are wired into framework-specific state and routing.

## Changes

### New module

**Source:** `libs/ui/src/utils/variantOptions/`

```
libs/ui/src/utils/variantOptions/
├── filterAvailableOptions.ts
├── filterAvailableOptions.test.ts
├── findVariant.ts
├── findVariant.test.ts
├── getDownstreamAxisCodes.ts
├── getDownstreamAxisCodes.test.ts
├── index.ts
└── types.ts
```

### Public API

```ts
import {
  filterAvailableOptions,
  findVariant,
  getDownstreamAxisCodes,
  type VariantLike,
  type VariantAttribute,
} from '@clicktap/ui/utils/variantOptions';
```

### Type contract

The minimum structural shape required by every function:

```ts
// libs/ui/src/utils/variantOptions/types.ts
export interface VariantAttribute {
  attribute: { code: string };
  option: { code: string; id?: string | null };
}

export interface VariantLike {
  attributes: VariantAttribute[];
}
```

Real-world variants typically carry far more (price, image, sku, …). Pass them in as-is — the generic constraint only requires `attributes`.

### `filterAvailableOptions`

```ts
export function filterAvailableOptions<V extends VariantLike>(
  variants: V[],
  selections: Record<string, string>,
  axes: string[],
  axisCode: string,
): Set<string>
```

- `axes` is the contract: top-down order, upstream → downstream. The caller decides ordering (typically via the attribute's `sortPriority` from the backend).
- For `axisCode` at index `i` in `axes`, only `selections[axes[0]]…selections[axes[i-1]]` constrain. Selections on `axes[i+1]…` are ignored.
- `axisCode === axes[0]` (or any axis not in `axes`) returns the full reachable set across `variants` for that code.
- Empty-string and `undefined` selections are treated as unconstrained.

### `findVariant`

```ts
export function findVariant<V extends VariantLike>(
  variants: V[],
  selections: Record<string, string>,
): V | undefined
```

- Empty/missing selections per axis are unconstrained.
- A selection matches if it equals either the option's `code` or `id` — supports callers that key by either.

### `getDownstreamAxisCodes`

```ts
export function getDownstreamAxisCodes(
  axes: string[],
  axisCode: string,
): string[]
```

- Returns `axes.slice(idx + 1)` where `idx = axes.indexOf(axisCode)`.
- Returns `[]` if `axisCode` isn't in `axes` (defensive — caller may pass a non-axis code).

## Pattern for Consumers

A minimal PDP variant picker built on these utilities looks like this:

```tsx
import { useMemo, useCallback, useState } from 'react';
import {
  filterAvailableOptions,
  findVariant,
  getDownstreamAxisCodes,
} from '@clicktap/ui/utils/variantOptions';

type Variant = {
  id: string;
  attributes: Array<{
    attribute: { code: string };
    option: { code: string; id?: string };
  }>;
  // ...your domain fields
};

type Props = {
  // Top-down ordered axes — upstream first.
  axes: { code: string; label: string; options: { code: string; label: string }[] }[];
  variants: Variant[];
};

export function VariantPicker({ axes, variants }: Props) {
  const axisCodes = useMemo(() => axes.map((a) => a.code), [axes]);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const setSelection = useCallback(
    (axisCode: string, optionCode: string) => {
      setSelections((prev) => {
        // Top-down: clear any selection downstream of this axis. Their value
        // may not exist in the new upstream scope.
        const downstream = getDownstreamAxisCodes(axisCodes, axisCode);
        const next: Record<string, string> = { ...prev, [axisCode]: optionCode };
        for (const code of downstream) {
          delete next[code];
        }
        return next;
      });
    },
    [axisCodes],
  );

  const matchedVariant = useMemo(
    () => findVariant(variants, selections),
    [variants, selections],
  );

  return (
    <div>
      {axes.map((axis) => {
        const reachable = filterAvailableOptions(
          variants,
          selections,
          axisCodes,
          axis.code,
        );
        return (
          <div key={axis.code}>
            <label>{axis.label}</label>
            {axis.options
              .filter((o) => reachable.has(o.code))
              .map((o) => (
                <button
                  key={o.code}
                  aria-pressed={selections[axis.code] === o.code}
                  onClick={() => setSelection(axis.code, o.code)}
                >
                  {o.label}
                </button>
              ))}
          </div>
        );
      })}
      {matchedVariant && <p>Matched: {matchedVariant.id}</p>}
    </div>
  );
}
```

Annotations:
- The `setSelections` callback is the entire top-down rule — clear downstream on any upstream change. Skip this and the picker behaves as a buggy version of symmetric filtering.
- `filterAvailableOptions` is called once per axis on each render. Cheap — O(variants × attributes).
- The pattern intentionally doesn't cover URL sync, manual-clear guards, or auto-collapse. Those are framework- and routing-specific; layer them on top.

## Migration Steps

This module is purely additive — there's no migration *required* of existing `@clicktap/ui` consumers. The steps below are for consumers who want to adopt it.

### 1. Bump `@clicktap/ui`

Once a release including this module is published, update the dependency:

```bash
pnpm up @clicktap/ui
```

Minimum version: **next minor after 0.27.2** (set the explicit floor once released).

### 2. Import where needed

```ts
import {
  filterAvailableOptions,
  findVariant,
  getDownstreamAxisCodes,
} from '@clicktap/ui/utils/variantOptions';
```

### 3. Pass top-down axis order

Wherever you call `filterAvailableOptions`, pass the axes array in upstream-to-downstream order. The natural source is your attribute list sorted by priority — for backends following the Clicktap shape, that's `sortPriority DESC`:

```ts
const axisCodes = product.attributes.map((a) => a.code);
// product.attributes is already sorted by sortPriority DESC server-side.

const reachable = filterAvailableOptions(
  product.variants,
  userSelections,
  axisCodes,
  attribute.code,
);
```

### 4. Clear downstream on upstream change

When the user picks a value for any axis, drop any downstream selections in the same state update:

```ts
const setUserSelection = (axisCode: string, optionCode: string) => {
  setSelections((prev) => {
    const downstream = getDownstreamAxisCodes(axisCodes, axisCode);
    const next = { ...prev, [axisCode]: optionCode };
    for (const code of downstream) {
      delete next[code];
    }
    return next;
  });
};
```

Skip this and you'll occasionally see the matched variant query against an impossible (upstream-changed but downstream-stale) selection set.

### Verification

- New axis renders all reachable options regardless of downstream state.
- Picking the upper axis clears the lower selections.
- Picking the lowest axis doesn't change which upper options are reachable.

## Files Changed

| File | Change |
|---|---|
| `libs/ui/src/utils/variantOptions/types.ts` | New — `VariantLike`, `VariantAttribute` |
| `libs/ui/src/utils/variantOptions/filterAvailableOptions.ts` | New — top-down filter |
| `libs/ui/src/utils/variantOptions/findVariant.ts` | New — generic match |
| `libs/ui/src/utils/variantOptions/getDownstreamAxisCodes.ts` | New — slice helper |
| `libs/ui/src/utils/variantOptions/index.ts` | New — barrel export |
| `libs/ui/src/utils/variantOptions/*.test.ts` | New — Jest coverage (15 tests) |

## References

- Frontend counterpart migration: [`apps/frontend/.../2026-04-30-top-down-pdp-option-dependency.md`](../../../../../apps/frontend/docs/migrations/2026/04/2026-04-30-top-down-pdp-option-dependency.md) ↔
- Prior symmetric-filter implementation it replaces: [`apps/frontend/.../2026-04-24-pdp-configurable-selector-ux.md`](../../../../../apps/frontend/docs/migrations/2026/04/2026-04-24-pdp-configurable-selector-ux.md)
