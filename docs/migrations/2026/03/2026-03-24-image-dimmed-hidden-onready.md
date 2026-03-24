# Image: dimmed, hidden, and onReady Props

**Date:** 2026-03-24
**Affects:** `@clicktap/ui` — `Image` component
**Classification:** IMPROVEMENT
**Breaking:** No
**Group:** plp-image-transitions

## Dependencies

*None*

See also: [Collection Image Filter Transitions](../../../../../apps/frontend/docs/migrations/2026/03/2026-03-24-collection-image-filter-transitions.md) ↔ — frontend implementation using these props

## Summary

The `Image` component gains three optional props for opacity-based loading transitions: `dimmed` (50% opacity), `hidden` (0% opacity), and `onReady` (callback when a new image loads after src change). When none of these props are passed, the component behaves exactly as before (blur-based loading). This also fixes a flicker bug caused by `onError` firing on valid images.

## Problem

Two issues existed:

1. **No way to coordinate image transitions** — collection grids needed to dim/hide images during filter changes to prevent stale variant images from flashing. The `Image` component had no props for external opacity control.

2. **onError flicker** — Next.js image optimization can fire `onError` on valid images when one `srcSet` variant fails while another succeeds. The immediate `setErrorSrc` call caused a re-render that produced a visible flicker. Additionally, `key={srcKey}` on the error boundary caused a full component remount on every src change.

## Changes

### New props on `ExtendedImageProps`

```typescript
export type ExtendedImageProps = ImageProps & {
  /** Reduce opacity to 50% (e.g., while waiting for data) */
  dimmed?: boolean;
  /** Hide image completely — opacity 0 (e.g., before grid rearrange) */
  hidden?: boolean;
  /** Fires when a new image has loaded after a src change */
  onReady?: () => void;
};
```

**Source**: `libs/ui/src/components/Image/Image.tsx:62-69`

### Managed vs unmanaged mode

When `dimmed`, `hidden`, or `onReady` are passed ("managed" mode):
- Opacity transitions replace the blur loading effect
- `opacity: 0` when hidden, `0.5` when loading or dimmed, `1` when loaded
- Src changes are detected during render (not `useEffect`) to prevent stale frame flash
- `onReady` fires when a new image finishes loading

When none are passed ("unmanaged" mode):
- Existing blur-based loading (`blur-md`) is preserved
- No opacity management, no src change detection
- Fully backward compatible

### onError debounce (bugfix)

`onError` now uses a 2-second debounced timeout. If `onLoad` fires within that window (which it does for valid images), the timeout is cleared and no error fallback occurs.

**Before:**
```tsx
onError={() => setErrorSrc(src)}
```

**After:**
```tsx
onError={() => {
  errorTimer.current = setTimeout(() => setErrorSrc(src), 2000);
}}
onLoad={(e) => {
  clearTimeout(errorTimer.current);
  setLoadingImg(false);
  // ...
}}
```

### Error boundary key removal (bugfix)

The `key={srcKey}` on `ImageErrorBoundary` has been removed. It was causing a full component remount on every src change, which destroyed state and produced flicker. The error boundary's `errorSrc` state check already handles src changes correctly.

## Migration Steps

No action required — these are additive, non-breaking changes. Existing `Image` usage is unaffected.

To use the new props:

```tsx
import { Image } from '@clicktap/ui/components/Image';

<Image
  alt="Product"
  src={imageUrl}
  width={500}
  height={625}
  dimmed={isLoading}         // optional: 50% opacity
  hidden={isHidden}          // optional: 0% opacity
  onReady={() => onLoaded()} // optional: callback when loaded
/>
```

## Migration Checklist

- [ ] Verify existing `Image` usage still works (blur loading, error fallback)
- [ ] Verify `dimmed` prop reduces opacity to 50%
- [ ] Verify `hidden` prop hides image completely (opacity 0)
- [ ] Verify `onReady` fires after src change + image load
- [ ] Verify no flicker on images that previously flickered with `onError`
