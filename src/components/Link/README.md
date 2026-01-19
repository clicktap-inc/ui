# Link

A styled link component built on React Aria's Link with automatic external URL detection.

## Features

- **External URL Detection**: Automatically adds `target="_blank"` and `rel="noopener noreferrer"` for external URLs
- **React Aria**: Built on `react-aria-components` for accessibility
- **Styled**: Default styling with hover states and disabled support

## Usage

```tsx
import { Link } from '@clicktap/ui/components/Link';

// Internal link - renders normally
<Link href="/products">Products</Link>

// External link - automatically opens in new tab with security attributes
<Link href="https://google.com">Google</Link>

// Anchor link - renders normally
<Link href="#section">Jump to section</Link>
```

## External URL Detection

The component automatically detects external URLs and applies:
- `target="_blank"` - opens in new tab
- `rel="noopener noreferrer"` - security best practice

**Detection logic:**
- Relative URLs (`/path`, `#anchor`) → internal
- Absolute URLs → compared against current host
  - Client: uses `window.location.host`
  - Server (SSR): uses `baseUrl` from `LinkProvider`

## LinkProvider

For SSR, wrap your app with `LinkProvider` to provide a base URL. In Next.js, use the `host` header from the request:

```tsx
// In a Server Component (e.g., layout.tsx)
import { headers } from 'next/headers';

const h = headers();
const baseUrl = `https://${h.get('host')}`;

<Providers baseUrl={baseUrl}>
  {children}
</Providers>

// In your Providers component
import { LinkProvider } from '@clicktap/ui/components/Link';

export function Providers({ baseUrl, children }) {
  return (
    <LinkProvider config={{ baseUrl }}>
      {children}
    </LinkProvider>
  );
}
```

On the client, `window.location.host` is used automatically regardless of the provider config. This means:
- SSR correctly detects external URLs using the request's host header
- Client-side navigation uses the browser's current host
- Multi-tenant deployments work correctly without hardcoded domains

## Props

Extends all props from React Aria's `LinkProps`:

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | URL to link to |
| `target` | `string` | Override automatic target (e.g., `_blank`, `_self`) |
| `rel` | `string` | Override automatic rel attribute |
| `isDisabled` | `boolean` | Disable the link |
| `className` | `string \| function` | Custom styling |

## Exports

```tsx
// Component
export { Link } from './Link';

// Provider and hook
export { LinkProvider, useLinkConfig, type LinkConfig } from './LinkContext';

// Utility
export { isExternalUrl } from './utils';
```
