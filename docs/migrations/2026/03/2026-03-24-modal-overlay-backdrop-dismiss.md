# ModalOverlay: Fix Dismiss on Backdrop Click

**Date:** 2026-03-24
**Affects:** `@clicktap/ui` — `ModalOverlay` component
**Classification:** BUGFIX
**Breaking:** No

## Dependencies

*None*

## Summary

Clicking the backdrop overlay behind a drawer or modal did not dismiss it, even with `isDismissable` set. Pressing Escape and the close button worked correctly. The fix adds an explicit `onPointerDown` handler to the `ModalOverlay` that closes when the user clicks directly on the backdrop.

## Problem

react-aria's `useInteractOutside` hook detects clicks **outside** a ref element to trigger dismiss. However, the `ModalOverlay` component covers the entire viewport — so every click, including on the backdrop, is considered "inside" the overlay ref. The dismiss never fires for backdrop clicks.

The `Modal` component already had `pointer-events-none [&>*]:pointer-events-auto` to let clicks pass through to the overlay, but react-aria's event detection still could not distinguish backdrop clicks from content clicks.

## Changes

**File**: `libs/ui/src/components/ModalOverlay/ModalOverlay.tsx`

The `InnerModalOverlay` component now:

1. Extracts `onOpenChange` from props (previously spread via `...restProps`)
2. Adds a `handlePointerDown` callback that calls `onOpenChange(false)` when the click target is the overlay element itself (`e.target === e.currentTarget`)
3. Passes both `onOpenChange` and `onPointerDown` to the overlay element

```tsx
const {
  key,
  shouldCloseOnInteractOutside: propShouldClose,
  onOpenChange,
  ...restProps
} = props;

// react-aria's useInteractOutside checks clicks outside the overlay ref,
// but since the overlay covers the viewport, backdrop clicks are "inside"
// and never trigger dismiss. Handle backdrop clicks explicitly.
const handlePointerDown = useCallback(
  (e: PointerEvent<HTMLDivElement>) => {
    if (isDismissable && e.target === e.currentTarget && onOpenChange) {
      onOpenChange(false);
    }
  },
  [isDismissable, onOpenChange],
);

const commonProps = {
  isDismissable,
  shouldCloseOnInteractOutside,
  onOpenChange,
  onPointerDown: handlePointerDown,
  // ...rest
};
```

**Source**: `libs/ui/src/components/ModalOverlay/ModalOverlay.tsx:139-183`

The `e.target === e.currentTarget` check ensures that only clicks directly on the backdrop trigger dismiss — clicks on child elements (the drawer/dialog content) are ignored because `e.target` would be a descendant, not the overlay itself.

## Migration Steps

1. Update `libs/ui/src/components/ModalOverlay/ModalOverlay.tsx`:
   - Add `PointerEvent` to the React type imports
   - Destructure `onOpenChange` from props alongside `key` and `shouldCloseOnInteractOutside`
   - Add the `handlePointerDown` callback
   - Add `onOpenChange` and `onPointerDown: handlePointerDown` to `commonProps`

2. Verify by opening any drawer (e.g., cart drawer) and clicking the dark backdrop area — it should now close.

## Migration Checklist

- [ ] Update `ModalOverlay.tsx` with the `handlePointerDown` handler
- [ ] Verify drawers dismiss on backdrop click
- [ ] Verify clicking inside a drawer does **not** dismiss it
- [ ] Verify Escape key still dismisses
- [ ] Verify close button still works
