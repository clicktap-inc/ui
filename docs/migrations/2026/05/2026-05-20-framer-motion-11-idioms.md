# framer-motion 11.x idioms — opacity-only for modal entry/exit, primitives over transform strings, matched keyframe shapes

**Date:** 2026-05-20
**Affects:** `@clicktap/ui/components/Dialog`, `@clicktap/ui/components/ModalOverlay`, `@clicktap/ui/components/Badge`, `@clicktap/ui/components/Loader/CircularEasing`, `@clicktap/ui/components/Loader/Pulse`, and any consumer-side `motion.*` usage on framer-motion 11.x.
**Classification:** COMPATIBILITY
**Breaking:** Yes (for consumers passing custom `animationVariants` containing multi-function `transform` strings, transform/scale primitives in modal variants, calc-with-mixed-units in animate targets, or who copy-paste the affected motion patterns into their own components — see Consumer Impact)

## Dependencies

*None.* Targets framer-motion 11.18.

## Summary

framer-motion 11.x's keyframe resolver crashes inside `mixObject` (`complex.mjs:48`) with `Cannot read properties of null (reading '0')` more often than the docs suggest. The root cause is `getMixer(null)`: `typeof null === 'object'` in JavaScript, so when the resolver hands a null keyframe value into the mixer factory it returns `mixObject`, and `mixObject` then dereferences a key on null and throws. Any time the resolver leaves a null in the keyframes array — unresolved DOM-dependent value, a key animated in one phase but missing in another, a complex/calc value that fails to parse, an un-interpolatable CSS property batched with other unresolved keyframes — it crashes here.

We hit this bug repeatedly across the UI library and the frontend app. After iterating on several "use primitives instead of transform strings" attempts that *still* crashed under realistic ancestor-AnimatePresence load, we landed on a small set of rules that hold:

1. **Modal entry/exit animations: animate `opacity` only.** Centering, scale, and any other transform-related styling stays in static CSS (Tailwind). The Dialog and ModalOverlay default variants now look like `{ opacity: 0 } ↔ { opacity: 1 }`, full stop.
2. **For non-modal motion (toasts, badges, page-level enter/exit), prefer framer-motion primitives (`x`, `y`, `rotate`, `scale`, `opacity`) over multi-function CSS `transform` strings.** Primitives compose into a single transform that framer-motion owns; transform strings go through the complex-value parser, which is the buggy code path.
3. **Every key that `animate` touches must also be present in `initial` and `exit`.** When you have a no-animation branch (`shouldAnimate ? animatedShape : skippedShape`), the skipped shape still has to include the same keys with sensible base values (usually `0`).
4. **Resolve unit math to pixels in JS before handing it to framer-motion.** Strings like `calc(-100% + Npx + Yrem)` are complex values; the parser can't reliably mix them across remeasure cycles.
5. **Anything WAAPI can't interpolate goes on a static CSS class, not in `variants`.** `backdrop-filter`, complex `clip-path`, gradient `background`, `pointer-events`, etc.

Until framer-motion 12.x lands (where this resolver is rewritten), treat these rules as the long-term convention, not a workaround.

## Problem

A timeline of what failed before we got to the right rule set:

1. **Dialog rendered off-center** — framer-motion was writing its own inline `transform` for `scale`, overwriting Tailwind `-translate-x-1/2 -translate-y-1/2` centering classes.
2. **`mixObject` crash on the Cybersource / Auth.Net checkout step** — saved-cards ↔ new-card-form toggle exposed two contributing causes: Dialog variants used multi-function `transform` strings, AND the `motion.div` toggling between forms had mismatched `initial` / `animate` / `exit` keys.
3. **`mixObject` crash on the Add Address modal** — Dialog had been "fixed" with primitives at this point, but the Badge cart-count component still animated `transform: 'scale(0/1)'` strings. Ancestor remeasure from the modal open triggered Badge's variants through the complex parser.
4. **Loader spinners crash similarly** — `CircularEasing` animated `transform: 'rotate(360deg)'` and `Pulse` animated `transform: ['scale(...)', ...]` array. Same complex-parser path.
5. **Toast position crash** — `Toast.tsx` animated `translateY: 'calc(-100% + Npx + Yrem)'` — a calc with mixed units (`%`, `px`, `rem`). The parser couldn't keep up across re-runs on layout shifts.
6. **Add Address modal *still* crashed** even with all the above fixed and Dialog variants on `x`/`y`/`scale` primitives. The final cause turned out to be the modal's own variants — `x: '-50%'` primitives still routed through the complex-value path under enough load. Once we dropped to opacity-only, the crash stopped.

The pattern is consistent: framer-motion 11.x's keyframe resolver gets confused when batched keyframe resolution sees any kind of non-trivial value (string with units, calc, multi-function transform, pointer-events, etc.). Opacity is reliably safe.

## Changes

| File | Change |
|---|---|
| `libs/ui/src/components/Dialog/Dialog.tsx` | Default `animationVariants` now `{ opacity: 0 } ↔ { opacity: 1 }` — no scale, no x/y. Centering restored to static Tailwind classes (`-translate-x-1/2 -translate-y-1/2`). |
| `libs/ui/src/components/ModalOverlay/ModalOverlay.tsx` | Default variants reduced to opacity-only; `pointerEvents` removed from variants. Backdrop blur stays on the static CSS class (already was). |
| `libs/ui/src/components/Badge/Badge.tsx` | `animationVariants` switched from `transform: 'scale(0/1)'` strings to `scale: 0 / 1` primitives. |
| `libs/ui/src/components/Loader/CircularEasing.tsx` | Spinner `animate` switched from `transform: 'rotate(360deg)'` to `rotate: 360` primitive. |
| `libs/ui/src/components/Loader/Pulse.tsx` | Pulse keyframes switched from `transform: ['scale(1)', 'scale(0.1)', ...]` to `scale: [1, 0.1, ...]` numeric keyframes. |
| `apps/frontend/components/Toast/Toast.tsx` | Container `translateY` calc string replaced with a numeric pixel `y` value. Container-height and rem-to-pixel resolved in JS before handing to framer-motion. |
| `apps/frontend/components/Toast/Notification.tsx` | `initial` / `animate` / `exit` shapes aligned (all three include `opacity`, `x`, `y`). `translateX`/`translateY` aliases dropped in favor of `x`/`y` primitives. |
| `apps/frontend/components/Checkout/Step/Payment/Cybersource/CybersourcePaymentMethod.tsx` | The no-animate branch of `initial` previously returned `{ opacity: 1 }` without `x`. Both branches now include `x: 0`, and `exit` includes `x: 0`. |
| `apps/frontend/components/Checkout/Step/Payment/Authorizenet/AuthorizenetPaymentMethod.tsx` | Same shape-consistency fix as Cybersource. |

### Dialog variants — final state

```tsx
// before — multi-function transform string; off-center; crashes under load
variants={
  animationVariants || {
    hidden: { transform: 'translate(-50%, -50%) scale(0.8)', opacity: 0 },
    visible: { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
  }
}
```

```tsx
// after — opacity only; centering moved to static Tailwind
className={cn(
  'p-8 outline-0 max-w-max w-screen absolute top-2/4 left-2/4',
  '-translate-x-1/2 -translate-y-1/2',   // ← centering back in CSS
  'shadow-... rounded-lg bg-white border ...',
  className,
)}
// ...
variants={
  animationVariants || {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
}
```

### ModalOverlay variants — final state

```tsx
// before
variants={
  animationVariants || {
    hidden: {
      opacity: 0,
      pointerEvents: 'none',              // ← non-interpolatable; risky
      transition: { delay: 0.08 },
    },
    visible: { opacity: 1, pointerEvents: 'auto' },
  }
}
```

```tsx
// after — opacity only; pointerEvents handled via static class on the overlay
variants={
  animationVariants || {
    hidden: { opacity: 0, transition: { delay: 0.08 } },
    visible: { opacity: 1 },
  }
}
```

### Badge variants — primitive swap

```tsx
// before
const animationVariants = {
  hidden: { opacity: 0, transform: 'scale(0)' },
  show:   { opacity: 1, transform: 'scale(1)' },
};
```

```tsx
// after
const animationVariants = {
  hidden: { opacity: 0, scale: 0 },
  show:   { opacity: 1, scale: 1 },
};
```

### Loader spinners — primitive swap

```tsx
// CircularEasing — before
<motion.svg animate={{ transform: 'rotate(360deg)', transition: {...} }} />

// CircularEasing — after
<motion.svg animate={{ rotate: 360, transition: {...} }} />
```

```tsx
// Pulse — before
<motion.div animate={{
  opacity: [1, 1, 0.7, 1, 1],
  transform: ['scale(1)', 'scale(1)', 'scale(0.1)', 'scale(1)', 'scale(1)'],
  transition: {...},
}} />

// Pulse — after
<motion.div animate={{
  opacity: [1, 1, 0.7, 1, 1],
  scale: [1, 1, 0.1, 1, 1],
  transition: {...},
}} />
```

### Toast container — calc → numeric pixels

```tsx
// before — calc with mixed units; complex parser stumbles on remeasure
const h = toastRef.current?.children?.item(y === 'top' ? notifications.length - 1 : 0)
  ?.getBoundingClientRect().height;
const translateY = isMobile
  ? { translateY: mobileY === 'top'
        ? `calc(-100% + ${h ?? 0}px + 1rem)`
        : `calc(100% - ${h ?? 0}px - 1rem)` }
  : { translateY: y === 'top'
        ? `calc(-100% + ${h ?? 0}px + 8rem)`
        : `calc(100% - ${h ?? 0}px - 3.5rem)` };
toastControls.set(translateY);
toastControls.start(translateY);
```

```tsx
// after — resolve to a single number, hand framer-motion a primitive
const h = toastRef.current?.children?.item(y === 'top' ? notifications.length - 1 : 0)
  ?.getBoundingClientRect().height ?? 0;
const containerHeight =
  toastRef.current?.getBoundingClientRect().height ?? 0;
const remPx =
  typeof window !== 'undefined'
    ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    : 16;
const translateYValue = isMobile
  ? mobileY === 'top'
      ? -containerHeight + h + 1 * remPx
      : containerHeight - h - 1 * remPx
  : y === 'top'
      ? -containerHeight + h + 8 * remPx
      : containerHeight - h - 3.5 * remPx;
const translateY = { y: translateYValue };
toastControls.set(translateY);
toastControls.start(translateY);
```

### Notification — shape consistency across initial/animate/exit

```tsx
// before — translateY/translateX aliases, exit drops the transform keys entirely
const initial = isMobile
  ? { opacity: 0, translateY: '200px' }
  : { opacity: 0, translateX: '200px' };
const animate = isMobile
  ? { opacity: 1, translateY: 0 }
  : { opacity: 1, translateX: 0 };
// ...
<motion.div initial={initial} animate={animate} exit={{ opacity: 0 }}>
```

```tsx
// after — primitives, same keys in all three phases
const initial = isMobile
  ? { opacity: 0, x: 0, y: 200 }
  : { opacity: 0, x: 200, y: 0 };
const animate = { opacity: 1, x: 0, y: 0 };
const exit    = { opacity: 0, x: 0, y: 0 };
// ...
<motion.div initial={initial} animate={animate} exit={exit}>
```

### `initial` / `animate` / `exit` shape consistency in app code

Same fix applies to consumer-side `motion.div` usage. From `CybersourcePaymentMethod`:

```tsx
// before — shouldAnimate=false branch omits x, but animate sets x:0; exit drops x too
<motion.div
  key="newCardForm"
  initial={shouldAnimate ? { opacity: 0, x: 32 } : { opacity: 1 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0 }}
/>
```

```tsx
// after — every key in animate is also in both initial branches and exit
<motion.div
  key="newCardForm"
  initial={shouldAnimate ? { opacity: 0, x: 32 } : { opacity: 1, x: 0 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 0 }}
/>
```

## Consumer Impact

Five categories of code in consuming projects to audit:

| Pattern | Required change |
|---|---|
| Custom `animationVariants` on `Dialog` / `ModalOverlay` containing **any** non-opacity property (scale, x/y primitives, transform strings, pointer-events, etc.) | Strip to `{ opacity: 0/1 }` and move all other styling to static CSS classes. |
| Custom `animationVariants` on `Badge`, loaders, or other non-modal components using multi-function `transform` strings | Split into framer-motion primitives (`x`, `y`, `scale`, `rotate`). |
| Local `motion.div` / `motion.section` / etc. where one of `initial` / `animate` / `exit` includes a key the others don't | Add the missing key with a sensible base value (usually `0`) to the other branches. |
| `motion.*` variants animating `calc(...)` strings with mixed units, or other complex CSS-value strings | Resolve to numeric pixels in JS first; hand framer-motion a number. |
| `motion.*` variants animating `backdrop-filter`, `clip-path`, `filter`, gradients, `pointer-events`, or any WAAPI-incompatible property | Move the value to a static CSS class; only animate `opacity` (or a primitive) to fade them on/off. |

Search commands:

```bash
# Multi-function transform strings in motion code
grep -rn "transform:.*translate\|transform:.*scale\|transform:.*rotate" apps/ libs/ \
  | grep -v vendor | grep -v node_modules

# Possibly-mismatched initial/animate shapes — look for `initial=` lines that
# differ in length from neighboring animate/exit lines
grep -rnA2 "initial=" apps/ libs/ | grep -v vendor | grep -v node_modules

# Custom variants for @clicktap/ui Dialog/Modal — any non-opacity prop here is suspect
grep -rn "animationVariants" apps/ libs/ | grep -v vendor

# calc() strings inside motion code
grep -rn "calc(" apps/ libs/ | grep -v node_modules | grep -v vendor | grep -i 'motion\|controls\|animate\|translate'

# WAAPI-incompatible CSS properties in motion variants
grep -rn "backdropFilter\|backdrop-filter\|clipPath\|clip-path\|pointerEvents:\s*'" apps/ libs/ | grep -v vendor
```

## Pattern for Consumers

The five rules below cover every framer-motion 11.x crash pattern we found. Apply them to any `motion.*` element or component receiving `variants` / `animate`.

**Rule 1 — Modal entry/exit: opacity only.** For `Dialog`, `ModalOverlay`, `Drawer`, and any other modal-like component, the entry/exit animation should be a fade. Everything else (centering, slide direction, scale) lives in static CSS. The default `@clicktap/ui` variants now follow this.

**Rule 2 — Primitives over transform strings.** For non-modal `motion.*` elements, prefer framer-motion primitives over `transform: '...'` strings.

| Avoid | Use |
|---|---|
| `transform: 'translateX(-50%)'` | `x: '-50%'` |
| `transform: 'translateY(10px)'` | `y: 10` |
| `transform: 'scale(0.9)'` | `scale: 0.9` |
| `transform: 'rotate(45deg)'` | `rotate: 45` |
| `transform: 'translate(-50%, -50%) scale(0.8)'` | `x: '-50%', y: '-50%', scale: 0.8` |
| `translateY: '200px'` (alias) | `y: 200` |

**Rule 3 — Keyframe shapes must match.** If `animate` sets `{ opacity, x, scale }`, then `initial` and `exit` must each include all three keys. The framer-motion docs allow omission in theory; in practice the 11.x keyframe resolver stores nulls and crashes on remeasure.

```tsx
// REFERENCE — same shape across initial/animate/exit
<motion.div
  initial={{ opacity: 0, x: 32 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 0 }}
/>
```

If you need a "no animation" branch, the skipped shape still has to include the same keys:

```tsx
// REFERENCE — branched initial that still matches the target shape
<motion.div
  initial={shouldAnimate ? { opacity: 0, x: 32 } : { opacity: 1, x: 0 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 0 }}
/>
```

**Rule 4 — Resolve unit math in JS, not in motion values.** Don't hand framer-motion calc strings with mixed units. Compute pixels in the consumer and pass a number.

```tsx
// AVOID
toastControls.start({ translateY: `calc(-100% + ${h}px + 8rem)` });

// USE
const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
const containerHeight = ref.current?.getBoundingClientRect().height ?? 0;
toastControls.start({ y: -containerHeight + h + 8 * remPx });
```

**Rule 5 — Un-interpolatable CSS goes on a static class.** `backdrop-filter`, complex `clip-path`, gradient `background`, `pointer-events`, etc. Don't put these in variants. Put them in a Tailwind class (or a `style` literal) and animate only `opacity` to fade them in/out. The `@clicktap/ui` `ModalOverlay` does this for `backdrop-blur-sm` — copy that pattern.

## Migration Steps

1. **Update `@clicktap/ui`** to a version that includes all of: Dialog opacity-only, ModalOverlay opacity-only, Badge primitive, Loader primitives (≥ this change).

2. **If your project overrides `animationVariants` on Dialog or ModalOverlay** with anything beyond opacity, simplify:

   ```tsx
   // before — risky: x/y primitives still route through the complex parser
   //          under enough ancestor-AnimatePresence load
   <Dialog
     animationVariants={{
       hidden:  { x: '-50%', y: '-50%', scale: 0.9, opacity: 0 },
       visible: { x: '-50%', y: '-50%', scale: 1,   opacity: 1 },
     }}
   />
   ```

   ```tsx
   // after — strip to opacity; centering moves to a wrapper className
   <Dialog
     animationVariants={{
       hidden:  { opacity: 0 },
       visible: { opacity: 1 },
     }}
     className="-translate-x-1/2 -translate-y-1/2 ..."
   />
   ```

3. **Audit local `motion.*` usage in your app** for the five rules. For each `motion.div` (or `motion.section` etc.):
   - Strip any non-opacity values out of the modal variants if it's a modal-shaped component.
   - Replace `transform: '...'` strings with primitives.
   - Match `initial` / `animate` / `exit` shapes — every key in `animate` must be in `initial` and `exit`.
   - Resolve calc-with-units to pixel numbers in JS.
   - Move backdrop-filter / pointer-events / clip-path / gradients to static CSS classes.

4. **Verify.**
   - Run the dev server and open every modal flow your project supports (cart drawer, address book Add/Edit, checkout payment-method toggle, custom dialogs). No console errors referencing `mixObject` or `complex.mjs`.
   - Open and close drawers/modals rapidly while a toast is mid-animation. No console errors.
   - Visit a page that renders the cart-count Badge while opening a modal. The Badge animation should play smoothly with no console error.
   - Run typecheck:
     ```bash
     docker compose exec -u app node-app sh -c 'cd /app && npx nx run frontend:typecheck'
     ```

## Rollback

Reverting any of the framer-motion 11 changes is safe — they're behavioral fixes with no schema or data implications. Down-migration: re-introduce the transform strings or trimmed `initial` shapes in the affected files. Note that the crash returns once you do — the framer-motion 11.x parser hasn't changed.

## Files Changed

```
libs/ui/src/components/Dialog/Dialog.tsx
libs/ui/src/components/ModalOverlay/ModalOverlay.tsx
libs/ui/src/components/Badge/Badge.tsx
libs/ui/src/components/Loader/CircularEasing.tsx
libs/ui/src/components/Loader/Pulse.tsx
apps/frontend/components/Toast/Toast.tsx
apps/frontend/components/Toast/Notification.tsx
apps/frontend/components/Checkout/Step/Payment/Cybersource/CybersourcePaymentMethod.tsx
apps/frontend/components/Checkout/Step/Payment/Authorizenet/AuthorizenetPaymentMethod.tsx
```

## References

- framer-motion `mixObject` source: `node_modules/framer-motion/dist/es/utils/mix/complex.mjs:48` — `if (a[key] !== undefined && b[key] !== undefined)` dereferences a key on `null` because `typeof null === 'object'` made `getMixer(null)` return `mixObject`.
- The framer-motion 11.x keyframe resolver is the upstream root cause; tracked in framer-motion's own issue tracker. 12.x rewrites this path. Adopt the rules above as long-term convention regardless of upgrade timing.
