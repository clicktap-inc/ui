# External Link Detection Migration

**Date:** 2026-01-14
**Affects:** `@clicktap/ui`, `apps/frontend`
**Breaking:** No (additive, but requires provider setup for SSR)
**Classification:** IMPROVEMENT


## Dependencies

*None*

## Summary

The `Link` component from `@clicktap/ui` now automatically detects external URLs and applies `target="_blank"` and `rel="noopener noreferrer"` attributes. This requires setting up `LinkProvider` for proper SSR support.

## Changes

1. `Link` component auto-detects external URLs
2. New `LinkProvider` for SSR base URL configuration
3. New `isExternalUrl` utility function
4. Layout files must pass `baseUrl` from host header

## Setup

### 1. Update Layouts to Pass baseUrl

In your Next.js layout files (Server Components), extract the host header and pass it to Providers:

```tsx
// app/(base)/layout.tsx
import { headers } from 'next/headers';

export default function Layout({ children }) {
  const h = headers();
  const baseUrl = `https://${h.get('host')}`;

  return (
    <Providers baseUrl={baseUrl}>
      {children}
    </Providers>
  );
}
```

```tsx
// app/(checkout)/layout.tsx
import { headers } from 'next/headers';

export default function CheckoutLayout({ children }) {
  const h = headers();
  const baseUrl = `https://${h.get('host')}`;

  return (
    <Providers baseUrl={baseUrl}>
      {children}
    </Providers>
  );
}
```

### 2. Update Providers Component

Add the `baseUrl` prop and wrap with `LinkProvider`:

```tsx
// providers/Providers.tsx
import { LinkProvider } from '@clicktap/ui/components/Link';

type Props = {
  baseUrl?: string;
  children: ReactNode;
  // ... other props
};

export function Providers({ baseUrl, children, ...props }: Props) {
  return (
    <LinkProvider config={{ baseUrl }}>
      {/* other providers */}
      {children}
    </LinkProvider>
  );
}
```

## How It Works

### Detection Logic

- **Relative URLs** (`/path`, `#anchor`) → Internal (no attributes added)
- **Absolute URLs** → Compared against current host
  - Same host → Internal
  - Different host → External (adds `target="_blank"` and `rel="noopener noreferrer"`)

### Host Detection

- **Client-side:** Uses `window.location.host` automatically
- **Server-side (SSR):** Uses `baseUrl` from `LinkProvider`

This ensures external links are correctly identified during both SSR and client-side rendering.

## Usage

No changes needed in component code. The `Link` component handles detection automatically:

```tsx
import { Link } from '@clicktap/ui/components/Link';

// Internal - renders normally
<Link href="/products">Products</Link>

// External - automatically gets target="_blank" rel="noopener noreferrer"
<Link href="https://google.com">Google</Link>

// Anchor - renders normally
<Link href="#section">Jump to section</Link>
```

### Override Behavior

You can override the automatic behavior if needed:

```tsx
// Force internal link behavior on external URL
<Link href="https://subdomain.mysite.com" target="_self">
  Subdomain
</Link>

// Force external link behavior on internal URL
<Link href="/download" target="_blank" rel="noopener noreferrer">
  Download
</Link>
```

## Utility Function

The `isExternalUrl` utility is exported for use outside the Link component:

```tsx
import { isExternalUrl } from '@clicktap/ui/components/Link';

const external = isExternalUrl('https://google.com', 'mysite.com');
// true

const internal = isExternalUrl('/products', 'mysite.com');
// false
```

## Files Changed

- `libs/ui/src/components/Link/Link.tsx` - Auto-detection logic
- `libs/ui/src/components/Link/LinkContext.tsx` - New provider
- `libs/ui/src/components/Link/utils.ts` - `isExternalUrl` utility
- `libs/ui/src/components/Link/index.ts` - Updated exports
- `apps/frontend/app/(base)/layout.tsx` - Pass baseUrl
- `apps/frontend/app/(checkout)/layout.tsx` - Pass baseUrl
- `apps/frontend/providers/Providers.tsx` - Add LinkProvider

## Migration Checklist

1. [ ] Update `libs/ui` to latest version
2. [ ] Add `baseUrl` prop to Providers component
3. [ ] Wrap app with `LinkProvider`
4. [ ] Update all layout files to pass `baseUrl` from host header
5. [ ] Test external links open in new tab
6. [ ] Test internal links work normally
7. [ ] Verify SSR renders correct attributes

---

# LinkAsButton → @clicktap/ui

**Date:** 2026-02-06

## Summary

`LinkAsButton` has been promoted from `apps/frontend/components/LinkAsButton/` into the shared UI library. `Button` also gains `primary`/`secondary`/`tertiary` variant aliases.

## Changes

### `LinkAsButton` promoted to shared UI library

- **Old import:** `import { LinkAsButton } from '../LinkAsButton/LinkAsButton'` (relative, app-level)
- **New import:** `import { LinkAsButton } from '@clicktap/ui/components/LinkAsButton'`
- The `[k: string]: any` catch-all type is removed — proper typing via `LinkProps` + `Pick<ButtonProps, 'variant' | 'size'>`
- Now supports all Button variants (`solid`, `outline`, `ghost`) plus aliases (`primary`, `secondary`, `tertiary`), `size` prop (`sm`, `md`, `lg`), and `isLoading`
- `apps/frontend/components/LinkAsButton/` has been deleted

### Breaking: `LinkAsButton` default behavior changed

The old local component had no default variant — it rendered as a transparent link with base layout classes. The new shared component defaults to `variant="solid"` and `size="md"`:

| Property | Old (local) | New (`@clicktap/ui`) |
|----------|-------------|----------------------|
| `variant` | none (transparent background, transparent border) | `solid` (dark background, white text) |
| `size` | none (no height constraint) | `md` (`h-10` = 40px height) |

**Impact:** Any `<LinkAsButton>` without an explicit `variant` prop now renders as a dark solid button with a 40px height constraint. This is especially problematic when wrapping images — the image gets constrained inside a styled button container.

**Fix:** Use `variant="ghost"` for transparent links, or use `<Link>` directly when button styling isn't appropriate (e.g., clickable product images):

```tsx
// Before: image wrapped in default LinkAsButton (was transparent, now solid)
<LinkAsButton href={url}>
  <Image ... />
</LinkAsButton>

// After: use plain Link for image wrappers
<Link href={url}>
  <Image ... />
</Link>

// After: use ghost variant if button semantics are needed
<LinkAsButton variant="ghost" href={url}>
  Text link
</LinkAsButton>
```

### Button variant aliases

- `Button` now accepts `primary`, `secondary`, and `tertiary` as variant values
- `primary` → `solid`, `secondary` → `outline`, `tertiary` → `ghost`
- Existing `solid`, `outline`, `ghost` values continue to work unchanged

---

# Image Component: Remove `width: 'auto'` Auto-Styling

**Date:** 2026-02-08
**Affects:** `@clicktap/ui` Image component, all consumers
**Breaking:** Yes - images using `width`/`height` props may render differently

## Summary

The `@clicktap/ui` Image component previously auto-prepended `{ width: 'auto', height: 'auto' }` to the style prop when `width` and `height` props were provided (not `fill`). The `width: 'auto'` has been removed because it overrides the HTML `width` attribute via CSS, causing images to render at their natural intrinsic size instead of the dimensions specified by the props.

## What Changed

```diff
  const imageStyle = hasSizedProps
-   ? { width: 'auto' as const, height: 'auto' as const, ...style }
+   ? { height: 'auto' as const, ...style }
    : style;
```

**Before:** Images with `width={100} height={100}` and no explicit `style` rendered at their natural resolution (CSS `width: auto` overrode the HTML attribute).

**After:** Images render at the width specified by the `width` prop. `height: 'auto'` preserves the natural aspect ratio.

## Migration

### Review Image usages without explicit `style` prop

Any `<Image>` that passes `width` and `height` props without a `style` override will now render at the `width` prop size instead of the natural image size. In most cases this is the correct behavior.

If the natural-size behavior was intentional, restore it with an explicit style:

```tsx
<Image width={100} height={100} style={{ width: 'auto', height: 'auto' }} ... />
```

### Add aspect ratio control where needed

If the displayed image needs a specific aspect ratio that differs from the source image's natural ratio, add CSS classes. Use the actual source image dimensions to determine the ratio (e.g., 960x1200 images → `aspect-[4/5]`):

```tsx
// Explicit aspect ratio matching source images (e.g., 960x1200 = 4:5)
<Image
  width={100} height={125}
  className="aspect-[4/5] object-cover"
  style={{ width: '100%', height: 'auto' }}
/>

// Fill container width, natural aspect ratio (common pattern, no extra classes needed)
<Image
  width={400} height={300}
  style={{ width: '100%', height: 'auto' }}
/>
```

### Affected areas to check

Visually inspect any page that displays product images:
- Cart drawer (mini-cart)
- Cart page
- Checkout order summary
- Checkout success / order confirmation
- Category listing pages
- Product collection components
- Account order history
