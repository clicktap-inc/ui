# `PLACEHOLDER_IMAGE` Export from `@clicktap/ui/utils/placeholder`

**Date:** 2026-04-24
**Affects:** `@clicktap/ui` consumers that render product/category images
**Classification:** IMPROVEMENT
**Breaking:** No

## Dependencies

- See [frontend counterpart](../../../../apps/frontend/docs/migrations/2026/04/2026-04-24-image-placeholder-frontend-fallback.md) ↔ for the consuming-app changes.

## Summary

Adds `PLACEHOLDER_IMAGE` — a self-contained data URL — to `@clicktap/ui/utils/placeholder`. Frontend apps render this whenever they have a null image to display, replacing the old "backend returns a placeholder URL" pattern.

The value is an inline `data:image/svg+xml;utf8,...` string containing a neutral grayscale "no image available" SVG (camera icon with diagonal slash). Works in every bundler (Next.js, Storybook, Jest, vanilla node) without consumer-side asset pipeline configuration — no `public/` copy, no rewrite, no build script.

## Changes

### New export

```ts
// libs/ui/src/utils/placeholder.ts
export const PLACEHOLDER_IMAGE: string;
```

Import path:

```ts
import { PLACEHOLDER_IMAGE } from '@clicktap/ui/utils/placeholder';
```

### What it looks like

The SVG is 200×200, viewBox `0 0 200 200`, with:
- Light gray background (`#f3f4f6`)
- Camera icon (rect + viewfinder bump + concentric lens circles), stroke `#9ca3af` weight 4
- Diagonal slash from upper-right to lower-left at 45° through the camera

The body is centered on the canvas (lens at canvas center 100,100); slash passes through canvas center. Symmetric.

## Pattern for Consumers

Use directly as the `src` for any image renderer:

```tsx
import { Image } from '@clicktap/ui/components/Image';
import { PLACEHOLDER_IMAGE } from '@clicktap/ui/utils/placeholder';

<Image
  src={product.image ?? PLACEHOLDER_IMAGE}
  alt={product.name}
  // ...
/>
```

Works equally well with raw `<img>`:

```tsx
<img src={product.image ?? PLACEHOLDER_IMAGE} alt="" />
```

For the PDP/PLP migration, see the [frontend counterpart guide](../../../../apps/frontend/docs/migrations/2026/04/2026-04-24-image-placeholder-frontend-fallback.md) — it covers the full cascade decision (variant → placeholder, no parent fallback) and the dead `no_selection` checks to remove.

## Files Changed

| File | What changed |
|---|---|
| `libs/ui/src/utils/placeholder.ts` | New file. Inlines the SVG and exports a data-URL constant. |
| `libs/ui/src/assets/clicktap-placeholder.svg` | New file. Source of truth for the SVG; the data URL above is a byte-for-byte copy. Keep in sync if the icon changes. |
| `libs/ui/package.json` | Adds `./assets/*` to the `exports` map (already in place from earlier work; mentioned here for completeness). |

## Migration Checklist

- [ ] `@clicktap/ui >= 0.27.0` installed in consumers.
- [ ] No need to copy any SVG into the consuming app's `public/` folder.
- [ ] Apply the [frontend counterpart guide](../../../../apps/frontend/docs/migrations/2026/04/2026-04-24-image-placeholder-frontend-fallback.md) for the consuming-app changes.

## Why a data URL and not a bundled file?

Three reasons:

1. **Zero consumer setup.** A bundled file requires consumers to either copy it into `public/` or configure a static-file plugin. A data URL works on import.
2. **Bundler-agnostic.** The `@clicktap/ui` package ships to apps using Next.js, Storybook, and Jest test runners. SVG-as-static-asset semantics differ across them; a string constant is identical everywhere.
3. **Tiny payload.** The SVG is ~700 bytes; URL-encoded it's ~1KB. Network overhead vs an HTTP-fetched SVG is negligible and we avoid a second request.
