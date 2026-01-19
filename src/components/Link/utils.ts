/**
 * Check if a URL is external (different host than current site).
 *
 * On client: uses window.location.host for accurate detection
 * On server (SSR): falls back to baseUrl or treats absolute URLs as external (safe default)
 *
 * @param href - The URL to check
 * @param baseUrl - Optional fallback base URL for SSR (e.g., 'https://example.com')
 * @returns true if the URL is external
 */
export function isExternalUrl(href: string, baseUrl?: string): boolean {
  // Relative URLs are internal
  if (href.startsWith('/') || href.startsWith('#')) {
    return false;
  }

  try {
    const url = new URL(href);

    // Client-side: use window.location for accurate detection
    if (typeof window !== 'undefined') {
      return url.host !== window.location.host;
    }

    // Server-side: fall back to configured baseUrl
    if (baseUrl) {
      const base = new URL(baseUrl);
      return url.host !== base.host;
    }

    // No baseUrl and no window - treat absolute URLs as external (safe default)
    return true;
  } catch {
    // Invalid URL - treat as internal
    return false;
  }
}
