# Input disableSkeleton Prop

**Date:** 2026-01-15
**Affects:** `@clicktap/ui`, `apps/frontend`
**Breaking:** No
**Classification:** IMPROVEMENT


## Dependencies

*None*

## Summary

Added a `disableSkeleton` prop to the Input component that allows consumers to skip the skeleton loading state during hydration. This is useful when you need immediate interactivity (e.g., auto-focus) on page load.

## Background

The Input component uses `useIsClient()` to show a skeleton placeholder during server-side rendering and hydration. This prevents hydration mismatches but causes a brief "flash" where the input appears disabled/skeleton before becoming interactive.

For forms where immediate user interaction is expected (like login/authentication pages), this delay can feel sluggish.

## Changes

### New Prop

```typescript
interface InputProps extends TextFieldProps {
  // ... existing props

  /**
   * When true, renders the input immediately without showing a skeleton during hydration.
   * Use this when the input doesn't need hydration protection (e.g., simple text inputs
   * that don't have complex state or need immediate interactivity).
   */
  disableSkeleton?: boolean;
}
```

## Usage

### Before

```tsx
<Input
  name="email"
  type="email"
  label="Email"
  autoFocus  // Won't work - skeleton renders first
/>
```

### After

```tsx
<Input
  name="email"
  type="email"
  label="Email"
  disableSkeleton  // Renders immediately
  autoFocus        // Now works as expected
/>
```

## When to Use

**Use `disableSkeleton` when:**
- The input needs to auto-focus on page load
- Immediate interactivity is important for UX
- The input is a simple text/email/password field without complex state

**Don't use `disableSkeleton` when:**
- The input has complex state that could cause hydration mismatches
- The input relies on client-only data that isn't available during SSR
- You're unsure - the default skeleton behavior is safer

## Migration Checklist

- [ ] Identify inputs that need immediate interactivity (e.g., login forms)
- [ ] Add `disableSkeleton` prop to those inputs
- [ ] Add `autoFocus` if the input should focus on page load
- [ ] Test that hydration works correctly (no console errors)
