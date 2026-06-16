# Select / AddressInput: `onSelectionChange` / `onChange` callback widened to `Key | T`

**Date:** 2026-04-17 *(documentation date; underlying react-aria upgrade landed 2026-01-19 via commit `7c27599b2a`)*
**Affects:** Frontend apps consuming `@clicktap/ui`'s `Select` and components that re-export its types (`AddressInput`, etc.). Any handler typed as `(value: Key) => void` breaks after the update.
**Classification:** COMPATIBILITY
**Breaking:** Yes — TypeScript-only. No runtime change; existing handlers still receive the same value at runtime, but strict TS setups fail to compile.

## Dependencies

| Package | Minimum version |
|---|---|
| `@clicktap/ui` | The release that bundles `react-aria-components ^1.12.x` (commit `7c27599b2a`). Confirm with `pnpm why react-aria-components` that the resolved version is `>= 1.12.0`. |

## Summary

`@clicktap/ui`'s `Select<T>` extends `AriaComboBoxProps<T>`. After the react-aria upgrade, the `onSelectionChange` argument type widened from `Key | null` to effectively `Key | null | T` — callers can now receive either the selected item's key **or**, in certain configurations, the full item object, depending on how the consumer sets up `items` and `selectedKey`.

For consumer handlers that were strictly typed `(key: Key) => void`, TypeScript now complains that `Key | T` is not assignable to `Key`. The fix is to narrow at the callback entry point.

## Consumer Impact

Types changed:

| Type | Before | After |
|---|---|---|
| `SelectProps<T>['onSelectionChange']` | `(key: Key \| null) => void` | `(key: Key \| null \| T) => void` (widened union) |
| `AddressInputProps['onChange']` (in `apps/frontend/components/AddressForm/AddressInput`) | Re-typed to `(address?: AddressSuggestion) => void` — consumer-owned. Still works after upgrade if the inner `onSelectionChange` handler narrows correctly. |

Find affected handlers:

```bash
# Handlers passed to Select or wrappers that assume `Key` only
grep -rn 'onSelectionChange\|onChange=' apps/frontend/ | \
  grep -E 'Select|AddressInput|Combobox|Dropdown' | \
  head -40
```

## Preconditions

- [ ] `@clicktap/ui` is pinned to the release containing commit `7c27599b2a` or later. Check with:
  ```bash
  jq '.dependencies["@clicktap/ui"]' apps/frontend/package.json
  ```
- [ ] `apps/frontend/package.json` is tracked in git. Some legacy project layouts gitignore it — de-ignore before applying changes so CI/typecheck runs see the fix.

## Migration Steps

### 1. Narrow the argument in your handler

The cleanest fix is a type guard at the callback boundary:

```tsx
// Before — TS error after upgrade
<Select
  items={items}
  onSelectionChange={(key: Key) => {
    selectItemByKey(key);
  }}
/>

// After — narrow the widened union
<Select
  items={items}
  onSelectionChange={(keyOrItem) => {
    const key = typeof keyOrItem === 'string' || typeof keyOrItem === 'number'
      ? keyOrItem
      : keyOrItem?.id;            // or whatever your T's key field is
    if (key === null || key === undefined) return;
    selectItemByKey(key);
  }}
/>
```

> **For consumers with 10+ call sites:** the per-site narrow above gets repetitive. Consider extracting a local helper to your project's `utils/` module:
>
> ```ts
> import type { Key } from 'react-aria-components';
>
> export function narrowKey<T extends { id: Key }>(
>   value: Key | T | null,
> ): Key | null {
>   if (value === null) return null;
>   if (typeof value === 'string' || typeof value === 'number') return value;
>   return value.id;
> }
> ```
>
> Then each call site becomes `onSelectionChange={(v) => { const key = narrowKey(v); if (key !== null) selectItemByKey(key); }}`. We may upstream this helper to `@clicktap/ui/utils` in a future release; for now, ship it locally if your codebase has enough call sites to justify the abstraction.

### 2. If you need the full item, accept it directly

When a handler wants the full `T`, skip the narrow and type against it:

```tsx
type Option = { id: Key; label: string };

<Select<Option>
  items={options}
  onSelectionChange={(value) => {
    // value is Key | null | Option — narrow by shape
    const option = typeof value === 'object' && value !== null ? value : null;
    if (option) onOptionSelected(option);
  }}
/>
```

### 3. For wrappers like `AddressInput`, narrow inside the wrapper once

If your app wraps `Select` (the clicktap `AddressInput` does this), narrow in one place so every consumer of the wrapper keeps its old `(address?: T) => void` contract:

```tsx
// apps/frontend/components/AddressForm/AddressInput/AddressInput.tsx
<Select<AddressSuggestion>
  items={suggestions}
  onSelectionChange={(keyOrItem) => {
    const selection = typeof keyOrItem === 'object' && keyOrItem !== null
      ? keyOrItem
      : suggestions.find((s) => s.key === keyOrItem);
    props.onChange?.(selection);
  }}
/>
```

### Verification

```bash
# Typecheck should pass with zero errors mentioning onSelectionChange
nx run frontend:typecheck
```

## Consumer-Project Workaround

If for any reason the consumer project can't yet take the new `@clicktap/ui` release but must compile:

1. **Pin the previous minor** in `apps/frontend/package.json`:
   ```json
   "@clicktap/ui": "~X.Y.Z"
   ```
   Replace `X.Y.Z` with the last minor before the react-aria 3.43.x bump.

2. **Or wrap locally** until ready — shadow `Select` in a local component that narrows the callback before forwarding:
   ```tsx
   // apps/frontend/components/LegacySelect.tsx
   import { Select as UpstreamSelect, type SelectProps } from '@clicktap/ui/components/Select';
   import type { Key } from 'react-aria-components';

   type LegacySelectProps<T extends { id: Key }> = Omit<SelectProps<T>, 'onSelectionChange'> & {
     onSelectionChange?: (key: Key | null) => void;
   };

   export function LegacySelect<T extends { id: Key }>(props: LegacySelectProps<T>) {
     return (
       <UpstreamSelect<T>
         {...props}
         onSelectionChange={(v) => {
           const key = typeof v === 'object' && v !== null ? v.id : v;
           props.onSelectionChange?.(key ?? null);
         }}
       />
     );
   }
   ```

Prefer the narrow-in-handler fix over the wrapper — the wrapper is only for bulk migrations where touching every call site at once isn't feasible.

## Rollback

Revert `@clicktap/ui` in `apps/frontend/package.json`:

```bash
docker compose exec -u app node-app pnpm --filter frontend add '@clicktap/ui@<previous-minor>'
```

Safe — TypeScript-only change. No persistent state involved.

## References

- Upstream commit: `7c27599b2a` — `refactor(ui): upgrade react-aria and refactor Select component`
- react-aria upgrade: `react-aria ^3.43.1`, `react-aria-components ^1.12.2`
- Existing related guide: `docs/migrations/2026-01-14-checkout-fixes.md` (partially documents this upgrade; expand with the onSelectionChange narrowing pattern above)
- Source: `libs/ui/src/components/Select/Select.types.ts`
- Wrapper reference: `apps/frontend/components/AddressForm/AddressInput/AddressInput.types.ts`
