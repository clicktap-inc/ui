# `PasswordCheck` — the `requirements` variant (adoption guide for forks)

**Date:** 2026-05-29 (retroactive — the variant already ships in `@clicktap/ui`)
**Affects:** `libs/ui/src/components/PasswordCheck/PasswordCheck.tsx`, `libs/ui/src/components/PasswordCheck/PasswordCheck.types.ts`
**Classification:** IMPROVEMENT
**Breaking:** No (the variant is additive; `default` is unchanged)

## Dependencies

- [`PasswordCheck` `requirements` variant hides until the visitor types](./2026-05-21-password-check-hide-on-empty.md) — the hide-on-empty refinement to this same variant.

## Summary

This guide documents the `requirements` variant of `PasswordCheck` so forked UI libraries (brand-specific `*-ui` packages) have a canonical surface to audit against. A forked library that branched before this variant landed only inherits what's written up — without a guide it stays on the meter-only `default` output and never picks up the per-rule checklist.

`PasswordCheck` renders a live ✓/○ checklist of password-policy rules plus a 5-bar strength meter when `variant="requirements"`. Reach for it on any complexity-enforcing form (signup, password reset, change password) — it surfaces each rule as the visitor types instead of waiting for zod's first-failing-rule message after blur.

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `string` | — | The current password value. |
| `variant` | `'default' \| 'short' \| 'requirements'` | `'default'` | `requirements` renders the checklist + meter. `default` renders the meter + "Password Strength" text. |
| `requirements` | `PasswordRequirement[]` | 8 chars / uppercase / digit / special | Override the rule list. Each rule is `{ label: string; test: (value: string) => boolean }`. |

## Behavior

- **Hides when `value` is empty** — showing four unchecked bullets before any input reads as a list of demands rather than live feedback. (See the [hide-on-empty guide](./2026-05-21-password-check-hide-on-empty.md).)
- Each rule transitions from `○` (slate) to `✓` (green) as it's met.
- The 5-bar strength meter colors match the `default` variant's meter (red → yellow → green → blue by strength).
- The component is stateless and pure — strength is derived from `value` via `checkStrength`.

## Usage

```tsx
<PasswordCheck value={password} variant="requirements" />
```

With a custom rule list:

```tsx
<PasswordCheck
  value={password}
  variant="requirements"
  requirements={[
    { label: 'At least 12 characters', test: (v) => v.length >= 12 },
    { label: 'No common words', test: (v) => !COMMON.has(v.toLowerCase()) },
  ]}
/>
```

## Forks — what to copy

If you forked `PasswordCheck` into a brand-specific UI library before this variant existed:

1. Copy the `variant === 'requirements'` branch and the `defaultRequirements` list verbatim, then re-skin colors to your palette (e.g. `brand-secondary-*` / `brand-error-*` / `brand-grayscale-*` in place of the raw Tailwind palette).
2. Add `'requirements'` to your `PasswordCheckProps['variant']` union and the `PasswordRequirement` type.
3. Switch your complexity-enforcing forms (`Signup`, `ResetPassword`, `Account/.../UpdatePassword`) to `variant="requirements"`.
4. **While you're in there — check for a stray `y: -10` translate.** Some forks carry a `motion.div initial={{ y: -10 }} animate={{ y: -10 }}` on the legacy text that leaves the strength text permanently shifted off the baseline. `@clicktap/ui` does **not** have this — its `default` variant positions the strength text with `translate-y-2/4` (intentional layout), not a framer-motion translate. If your fork has the `y: -10`, drop it.

## Why retroactive

A new variant on a shared component can only propagate to forks that know it exists. **Broader pattern:** when adding a variant or non-trivial prop to a `libs/ui` component, write a short migration guide noting (a) what's new, (b) when to reach for it, (c) what to copy if a downstream library forked. The cost is minutes; it closes the silent-drift gap.
