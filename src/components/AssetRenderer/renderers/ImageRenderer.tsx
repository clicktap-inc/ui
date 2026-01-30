'use client';

import { getAssetUrl, type AssetUrlOptions } from '../../../utils/asset-url';

export interface ImageRendererProps {
  /** Asset UUID */
  uuid: string;
  /** Alt text for the image */
  alt: string;
  /** Optional specific version */
  version?: number;
  /** Optional filename for URL */
  filename?: string;
  /** JWT token for authenticated access */
  token?: string;
  /** CSS class name */
  className?: string;
  /** Loading strategy */
  loading?: 'lazy' | 'eager';
  /** Width attribute */
  width?: number | string;
  /** Height attribute */
  height?: number | string;
}

/**
 * Renders an image asset.
 *
 * @example
 * <ImageRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   alt="Company Logo"
 *   className="w-full max-w-md"
 * />
 */
export function ImageRenderer({
  uuid,
  alt,
  version,
  filename,
  token,
  className,
  loading = 'lazy',
  width,
  height,
}: ImageRendererProps) {
  const urlOptions: AssetUrlOptions = { version, filename, token };
  const url = getAssetUrl(uuid, urlOptions);

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  );
}

export default ImageRenderer;
