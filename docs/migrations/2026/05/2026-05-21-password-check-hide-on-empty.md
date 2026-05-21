# `PasswordCheck` `requirements` variant hides until the visitor types

**Date:** 2026-05-21
**Affects:** `libs/ui/src/components/PasswordCheck/PasswordCheck.tsx`
**Classification:** IMPROVEMENT
**Breaking:** No

## Dependencies

*None.*

## Summary

The `requirements` variant of `PasswordCheck` previously rendered all four unchecked bullet-points and a 0% strength bar as soon as the password field was mounted. Before the visitor had typed a single character, this read as a list of demands rather than as live feedback — pre-emptive shouting. Now `PasswordCheck` returns `null` from its `requirements` branch when `value` is empty, and reveals the rules + strength bar on the first keystroke.

This matches the spirit of the existing pattern: feedback that reflects what the visitor is doing right now, not feedback that runs ahead of them.

## Changes

```tsx
// PasswordCheck.tsx — requirements branch
if (variant === 'requirements') {
  if (!value) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      {/* requirements list + strength bar */}
    </div>
  );
}
```

The `default` variant is unchanged.

## Migration Steps

1. **Pull the latest `@clicktap/ui`** (or merge the equivalent change in your local copy). No public API changed; the only difference is render output for the `requirements` variant.

2. **Verify.**
   - On the signup form (`/account/authenticate` or in checkout), open the page with the password field unfocused. The previous list of four unchecked requirements should no longer appear; the area below the password input should be empty.
   - Focus the password input. Type one character. The requirements list and strength bar should reveal, with the rule that's now satisfied (or the first-character rule, if you have one) ticking checked as appropriate.
   - Clear the field — the requirements should disappear again.

## Files Changed

```
libs/ui/src/components/PasswordCheck/PasswordCheck.tsx
```
