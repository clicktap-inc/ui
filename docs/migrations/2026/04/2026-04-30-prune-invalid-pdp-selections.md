# PDP Option Selection — Conservative Prune Helper (`pruneInvalidSelections`)

**Date:** 2026-04-30
**Affects:** `@clicktap/ui/utils/variantOptions` — adds `pruneInvalidSelections`
**Classification:** IMPROVEMENT
**Breaking:** No (additive)

## Dependencies

- Builds on [`2026-04-30-top-down-pdp-option-dependency.md`](./2026-04-30-top-down-pdp-option-dependency.md). That migration introduced top-down option filtering with a blanket "clear every downstream selection on any upstream change". This migration replaces the recommended consumer pattern with a more conservative prune that preserves still-valid downstream picks.
- Frontend counterpart: [`apps/frontend/.../2026-04-30-prune-invalid-pdp-selections.md`](2026-04-30-prune-invalid-pdp-selections.md) ↔.

## Summary

Adds `pruneInvalidSelections(variants, selections, axes)` to `@clicktap/ui/utils/variantOptions`. Walks the selection map top-to-bottom and drops only entries whose value is no longer reachable under the (possibly already-pruned) upstream context. Preserves user intent: a downstream pick is dropped only when actually invalid, never just because an upstream sibling changed.

`getDownstreamAxisCodes` is kept exported for convenience but the recommended `setUserSelection` pattern now uses `pruneInvalidSelections` instead.

## Why

The previous `setUserSelection` pattern (from the earlier 2026-04-30 migration) blanket-cleared every axis downstream of the changed one. That's correct, but it discards user intent in a common case:

- User has `Color=Red, Size=Large, Material=Cotton`.
- User changes `Color` to `Blue`.
- If `Blue+Large+Cotton` is a real variant, blanket-clear still drops both `Size` and `Material` and forces the user to repick.

`pruneInvalidSelections` keeps still-valid downstream picks. Three behaviors:

| Scenario | Blanket clear (old) | Prune (new) |
|---|---|---|
| `Blue+Large+Cotton` is a real variant | Drops Size and Material | Keeps both |
| `Blue+Large` exists but `Blue+Large+Cotton` doesn't | Drops Size and Material | Keeps Size, drops Material |
| `Blue+Large` doesn't exist | Drops Size and Material | Drops Size and Material |

## Public API

```ts
import {
  pruneInvalidSelections,
  filterAvailableOptions,
  findVariant,
  getDownstreamAxisCodes,
} from '@clicktap/ui/utils/variantOptions';
```

```ts
/**
 * Walks `selections` top-to-bottom along `axes` and drops any whose value
 * is no longer reachable under the (possibly already-pruned) upstream
 * context.
 *
 * Validates the entire selection map, not just downstream of one axis —
 * works for both selection mutation and URL/state rehydration.
 *
 * Returns the same object reference when nothing was dropped, so callers
 * can use `===` to skip downstream state updates.
 */
function pruneInvalidSelections<V extends VariantLike>(
  variants: V[],
  selections: Record<string, string>,
  axes: string[],
): Record<string, string>;
```

Implementation properties worth knowing:

- **Top-to-bottom iteration**: each axis evaluates against axes earlier in `axes` that have already been validated this pass. Cascades through naturally — if an upstream pick gets dropped, downstream is re-checked against the now-empty upstream slot.
- **Object identity preserved**: returns `selections` unchanged when nothing is dropped. Lets `useState` setters skip downstream re-renders via referential equality.
- **Conservative**: a downstream value is dropped only when its reachable set (under current upstream) doesn't contain it. Independence between sibling axes is preserved. E.g. switching `Color: Red→Blue` keeps `Material: Cotton` even when `Size` was dropped, as long as `Blue+(any size)+Cotton` exists.

## Pattern for Consumers

Replace `getDownstreamAxisCodes` + manual delete in your selection handler with `pruneInvalidSelections` over the full candidate map. **Read the previous selections from the closure and run all side effects in event-handler scope — do NOT use the functional-updater form of setState here**:

```tsx
import { pruneInvalidSelections } from '@clicktap/ui/utils/variantOptions';

const setSelection = useCallback(
  (axisCode: string, optionCode: string) => {
    if (selections[axisCode] === optionCode) {
      return;
    }
    const candidate = { ...selections, [axisCode]: optionCode };
    // Prune cascades: top-to-bottom, each axis reads pruned upstream.
    const next = pruneInvalidSelections(variants, candidate, axisCodes);

    setSelections(next);
    writeSelectionsToUrl(next); // or any other side effect
  },
  [axisCodes, selections, variants],
);
```

> ⚠ **Don't put side effects inside a `setSelections((prev) => ...)` updater.**
> React requires functional updaters to be pure — no calls that schedule
> updates on other components, no mutations. Calling `router.replace()` (or
> any side effect that dispatches into another component's render cycle)
> from inside an updater triggers `"Cannot update a component while
> rendering a different component"` and a recoverable crash on
> first-select / deselect interactions. React 19 enforces this harder.
> Read the previous state from the closure and put side effects after the
> setter, in the event-handler scope. Trade-off: closure-read loses
> stale-closure protection if multiple selections fire in the same
> event-loop tick — fine for swatch clicks paced by humans, but if you
> wire a programmatic batch-set-multiple-axes flow on top, defer the side
> effects to a `useEffect` keyed on `selections` and bring back the
> functional updater for the state write.

If your component tracks per-axis manual-clear flags (so auto-collapse doesn't re-fill an axis the user explicitly cleared), only unflag the axes that the prune actually dropped:

```tsx
const candidate = { ...selections, [axisCode]: optionCode };
const next      = pruneInvalidSelections(variants, candidate, axisCodes);

for (const code of axisCodes) {
  if (candidate[code] !== undefined && next[code] === undefined) {
    manuallyClearedAxes.current.delete(code);
  }
}

setSelections(next);
writeSelectionsToUrl(next);
```

Otherwise, a kept (still-valid) selection could later get auto-collapsed back to a value the user previously cleared.

## Migration Steps

This is purely additive — existing code keeps compiling. To adopt:

### 1. Bump `@clicktap/ui`

```bash
pnpm up @clicktap/ui
```

Minimum version: **next minor after the release that ships this migration**.

### 2. Replace blanket clear with prune in selection handlers

Find every call site that uses `getDownstreamAxisCodes` to clear downstream selections:

```bash
grep -rn 'getDownstreamAxisCodes' apps/ libs/ --include='*.ts' --include='*.tsx'
```

Replace the manual delete loop with a single `pruneInvalidSelections` call (see "Pattern for Consumers" above). `getDownstreamAxisCodes` itself stays exported for any caller that genuinely needs the codes for non-prune purposes.

### Verification

- **Behavior**: change an upstream axis on a configurable PDP. Confirm a downstream selection that's still reachable (i.e. the new combination is a real variant) stays selected. Confirm a downstream selection that's now unreachable gets dropped.
- **Lib tests**: `nx test ui --testPathPattern variantOptions` → 26 tests pass (was 15).
- **Typecheck**: `nx run frontend:typecheck` (or your app equivalent) → no errors.

## Files Changed

| File | Change |
|---|---|
| `libs/ui/src/utils/variantOptions/pruneInvalidSelections.ts` | New — top-to-bottom prune helper |
| `libs/ui/src/utils/variantOptions/pruneInvalidSelections.test.ts` | New — Jest coverage (11 tests) |
| `libs/ui/src/utils/variantOptions/index.ts` | Export `pruneInvalidSelections` |

## References

- Frontend counterpart migration: [`apps/frontend/.../2026-04-30-prune-invalid-pdp-selections.md`](2026-04-30-prune-invalid-pdp-selections.md) ↔
- Previous top-down migration this builds on: [`2026-04-30-top-down-pdp-option-dependency.md`](./2026-04-30-top-down-pdp-option-dependency.md)
