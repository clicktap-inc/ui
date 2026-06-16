# Select popoverPortalContainer Restored

**Date:** 2026-02-17
**Affects:** `@clicktap/ui` Select component, any consumer using Select inside Dialog or Modal
**Classification:** BUGFIX
**Breaking:** No

## Dependencies

*None*

## Summary

The `popoverPortalContainer` prop was incorrectly removed from the Select component on 2026-01-30 during the react-aria upgrade refactor. This prop controls where the Popover is portalled, which is essential when Select is used inside a Dialog — without it, the Popover renders into `document.body`, causing incorrect width calculation because both Dialog and Popover use react-aria's Modal internals. The prop has been restored using `UNSAFE_PortalProvider` from `react-aria`.

## Problem

The react-aria upgrade (commits `7c27599` and `93ae6b3` on 2026-01-30) removed `popoverPortalContainer` in two steps:

1. Commit `7c27599` correctly migrated from `UNSTABLE_portalContainer` (on Popover) to `UNSAFE_PortalProvider` (wrapper), preserving the feature
2. Commit `93ae6b3` then removed the feature entirely — deleting the prop from types, removing the `UNSAFE_PortalProvider` import and conditional rendering

The migration guide in [Checkout Fixes — Section 6](../../../../../../apps/frontend/docs/migrations/2026/01/2026-01-14-checkout-fixes.md) was updated to document this removal as intentional. It was not — `popoverPortalContainer` was a working feature, not a deprecated one.

**If your codebase was updated following that migration guide**, you may have removed `popoverPortalContainer` usage from Select instances. Review git history around 2026-01-30 for removals:

```bash
git log --all --oneline --after="2026-01-28" --before="2026-02-01" -- '*.tsx' '*.ts' | head -20
git log --all -p --after="2026-01-28" --before="2026-02-01" -S "popoverPortalContainer" -- '*.tsx'
```

## Changes

| File | What changed |
|------|-------------|
| `libs/ui/src/components/Select/Select.tsx` | Restored `UNSAFE_PortalProvider` import from `react-aria`; restored conditional portal wrapping |
| `libs/ui/src/components/Select/Select.types.ts` | Restored `popoverPortalContainer?: () => HTMLElement | null` prop |

### Restored behavior

When `popoverPortalContainer` is provided, the Popover is wrapped in `UNSAFE_PortalProvider` which controls where the portal renders. When omitted, default react-aria behavior applies (portal to `document.body`).

```tsx
// Select.tsx — restored conditional
{popoverPortalContainer ? (
  <UNSAFE_PortalProvider getContainer={popoverPortalContainer}>
    {popoverContent}
  </UNSAFE_PortalProvider>
) : (
  popoverContent
)}
```

**Source:** `libs/ui/src/components/Select/Select.tsx:209`

## Migration Steps

1. **If you removed `popoverPortalContainer` from Select usage** following the previous migration guide, restore it:

   ```tsx
   // Restore this where Select is used inside Dialog/Modal
   <Select popoverPortalContainer={() => dialogRef.current}>
   ```

2. **Note the type change from the original API** — this was correctly updated during the react-aria upgrade and remains changed:

   ```tsx
   // Old (pre-upgrade)
   popoverPortalContainer?: Element;

   // Current (restored)
   popoverPortalContainer?: () => HTMLElement | null;
   ```

   The prop now takes a **getter function** instead of a direct element reference.

3. **The `UNSAFE_PortalProvider` import is from `react-aria`**, not `react-aria-components`. If you have custom components that also need portal control, import from the correct package.

## Migration Checklist

- [ ] Search git history for removed `popoverPortalContainer` usage around 2026-01-30
- [ ] Restore `popoverPortalContainer` on any Select used inside Dialog, Modal, or other overlay contexts
- [ ] Update prop value from `Element` to `() => HTMLElement | null` getter if restoring pre-upgrade code
- [ ] Verify Select popover width matches trigger width when rendered inside Dialog
