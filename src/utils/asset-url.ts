/**
 * Asset URL utility for generating authenticated asset download URLs.
 *
 * URL patterns:
 *   /media/assets/{uuid} - latest version
 *   /media/assets/{uuid}?v={version} - specific version
 *   /media/assets/{uuid}/{filename} - with filename for SEO/clarity
 *   /media/assets/{uuid}/{filename}?v={version} - specific version with filename
 *
 * Query params:
 *   - v={version}: Request specific version number
 *   - download: Force download (attachment) instead of inline display
 *   - token={jwt}: JWT token for authenticated access (for SSE, direct links, etc.)
 */

export interface AssetUrlOptions {
  /** Specific version number to request */
  version?: number;
  /** Filename to include in URL (for SEO/clarity, must match actual filename) */
  filename?: string;
  /** Force download (attachment) instead of inline display */
  download?: boolean;
  /** JWT token for authenticated access (for direct links, emails, etc.) */
  token?: string;
}

/**
 * Generate an asset download URL.
 *
 * @param uuid - Asset UUID
 * @param options - Optional URL configuration
 * @returns Asset download URL
 *
 * @example
 * // Basic usage - latest version
 * getAssetUrl('550e8400-e29b-41d4-a716-446655440000')
 * // => '/media/assets/550e8400-e29b-41d4-a716-446655440000'
 *
 * @example
 * // With specific version
 * getAssetUrl('550e8400-e29b-41d4-a716-446655440000', { version: 2 })
 * // => '/media/assets/550e8400-e29b-41d4-a716-446655440000?v=2'
 *
 * @example
 * // With filename and download flag
 * getAssetUrl('550e8400-e29b-41d4-a716-446655440000', {
 *   filename: 'company-logo.png',
 *   download: true
 * })
 * // => '/media/assets/550e8400-e29b-41d4-a716-446655440000/company-logo.png?download'
 *
 * @example
 * // With JWT token for authenticated direct link
 * getAssetUrl('550e8400-e29b-41d4-a716-446655440000', { token: 'eyJ...' })
 * // => '/media/assets/550e8400-e29b-41d4-a716-446655440000?token=eyJ...'
 */
export function getAssetUrl(
  uuid: string,
  options: AssetUrlOptions = {},
): string {
  const { version, filename, download, token } = options;

  // Build base path
  let path = `/media/assets/${encodeURIComponent(uuid)}`;

  // Add filename if provided
  if (filename) {
    path += `/${encodeURIComponent(filename)}`;
  }

  // Build query params
  const params = new URLSearchParams();

  if (version !== undefined) {
    params.set('v', String(version));
  }

  if (download) {
    params.set('download', '');
  }

  if (token) {
    params.set('token', token);
  }

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * Generate an absolute asset download URL with origin.
 *
 * @param uuid - Asset UUID
 * @param origin - Base URL origin (e.g., 'https://example.com')
 * @param options - Optional URL configuration
 * @returns Absolute asset download URL
 *
 * @example
 * getAbsoluteAssetUrl('550e8400-e29b-41d4-a716-446655440000', 'https://clicktap.com')
 * // => 'https://clicktap.com/media/assets/550e8400-e29b-41d4-a716-446655440000'
 */
export function getAbsoluteAssetUrl(
  uuid: string,
  origin: string,
  options: AssetUrlOptions = {},
): string {
  const path = getAssetUrl(uuid, options);
  return `${origin.replace(/\/$/, '')}${path}`;
}

export default getAssetUrl;
