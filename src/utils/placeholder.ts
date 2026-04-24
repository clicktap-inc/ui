/**
 * Inline data URL for the baseline clicktap image placeholder.
 *
 * Consumers render this as the `src` for any product/category image that came
 * back null from the API — the frontend owns the terminal fallback, so
 * consumers never need to ship the SVG into their public folder or configure a
 * static route.
 *
 * Source of truth is `assets/clicktap-placeholder.svg`; the string below is a
 * byte-for-byte copy wrapped in a data URL. Keep them in sync if the SVG
 * changes.
 */
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="No image available"><rect width="200" height="200" fill="#f3f4f6"/><g stroke="#9ca3af" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M82 66 L90 56 L110 56 L118 66"/><rect x="48" y="66" width="104" height="68" rx="8"/><circle cx="100" cy="100" r="22"/><circle cx="100" cy="100" r="10"/><line x1="32" y1="168" x2="168" y2="32"/></g></svg>`;

export const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(SVG)}`;
