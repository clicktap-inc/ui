'use client';

import { type ReactNode } from 'react';
import { getAssetUrl, type AssetUrlOptions } from '../../utils/asset-url';
import {
  ImageRenderer,
  VideoRenderer,
  AudioRenderer,
  PdfRenderer,
  DownloadLink,
} from './renderers';

export interface AssetRendererProps {
  /** Asset UUID */
  uuid: string;
  /** Asset mime type (e.g., 'image/png', 'application/pdf') */
  mimeType: string;
  /** Asset name for display and accessibility */
  name: string;
  /** Optional filename for URL */
  filename?: string;
  /** Optional specific version */
  version?: number;
  /** JWT token for authenticated access */
  token?: string;
  /** Custom className for the container */
  className?: string;
  /** Alt text for images (defaults to name) */
  alt?: string;
  /** Custom renderers by mime type pattern */
  renderers?: Partial<Record<MimeCategory, AssetRendererFunction>>;
  /** Fallback renderer for unknown types */
  fallback?: AssetRendererFunction;
}

export type MimeCategory =
  | 'image'
  | 'video'
  | 'audio'
  | 'pdf'
  | 'text'
  | 'unknown';

export interface AssetRenderContext {
  uuid: string;
  url: string;
  mimeType: string;
  name: string;
  filename?: string;
  version?: number;
  token?: string;
  className?: string;
  alt?: string;
}

export type AssetRendererFunction = (context: AssetRenderContext) => ReactNode;

/**
 * Determine the mime category from a mime type string.
 */
function getMimeCategory(mimeType: string): MimeCategory {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('text/')) return 'text';
  return 'unknown';
}

/**
 * Default image renderer using ImageRenderer component
 */
const defaultImageRenderer: AssetRendererFunction = ({
  uuid,
  alt,
  name,
  version,
  filename,
  token,
  className,
}) => (
  <ImageRenderer
    uuid={uuid}
    alt={alt ?? name}
    version={version}
    filename={filename}
    token={token}
    className={className}
    loading="lazy"
  />
);

/**
 * Default video renderer using VideoRenderer component
 */
const defaultVideoRenderer: AssetRendererFunction = ({
  uuid,
  mimeType,
  name,
  version,
  filename,
  token,
  className,
}) => (
  <VideoRenderer
    uuid={uuid}
    mimeType={mimeType}
    title={name}
    version={version}
    filename={filename}
    token={token}
    className={className}
    controls
  />
);

/**
 * Default audio renderer using AudioRenderer component
 */
const defaultAudioRenderer: AssetRendererFunction = ({
  uuid,
  mimeType,
  name,
  version,
  filename,
  token,
  className,
}) => (
  <AudioRenderer
    uuid={uuid}
    mimeType={mimeType}
    title={name}
    version={version}
    filename={filename}
    token={token}
    className={className}
    controls
  />
);

/**
 * Default PDF renderer using PdfRenderer component
 */
const defaultPdfRenderer: AssetRendererFunction = ({
  uuid,
  name,
  version,
  filename,
  token,
  className,
}) => (
  <PdfRenderer
    uuid={uuid}
    title={name}
    version={version}
    filename={filename}
    token={token}
    className={className}
  />
);

/**
 * Default text renderer (embeds in iframe)
 */
const defaultTextRenderer: AssetRendererFunction = ({
  url,
  name,
  className,
}) => <iframe src={url} title={name} className={className} />;

/**
 * Default fallback renderer using DownloadLink component
 */
const defaultFallbackRenderer: AssetRendererFunction = ({
  uuid,
  name,
  version,
  filename,
  token,
  className,
}) => (
  <DownloadLink
    uuid={uuid}
    name={name}
    version={version}
    filename={filename}
    token={token}
    className={className}
  />
);

const defaultRenderers: Record<MimeCategory, AssetRendererFunction> = {
  image: defaultImageRenderer,
  video: defaultVideoRenderer,
  audio: defaultAudioRenderer,
  pdf: defaultPdfRenderer,
  text: defaultTextRenderer,
  unknown: defaultFallbackRenderer,
};

/**
 * Renders an asset based on its mime type.
 *
 * Supports images, videos, audio, PDFs, and text files out of the box.
 * Unknown types render as download links.
 *
 * @example
 * // Basic image
 * <AssetRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   mimeType="image/png"
 *   name="Company Logo"
 * />
 *
 * @example
 * // PDF with custom class
 * <AssetRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   mimeType="application/pdf"
 *   name="Annual Report"
 *   className="w-full h-[600px]"
 * />
 *
 * @example
 * // With custom renderer for images
 * <AssetRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   mimeType="image/png"
 *   name="Product Image"
 *   renderers={{
 *     image: ({ url, alt }) => (
 *       <NextImage src={url} alt={alt} width={300} height={200} />
 *     ),
 *   }}
 * />
 */
export function AssetRenderer({
  uuid,
  mimeType,
  name,
  filename,
  version,
  token,
  className,
  alt,
  renderers = {},
  fallback,
}: AssetRendererProps): ReactNode {
  const urlOptions: AssetUrlOptions = {
    version,
    filename,
    token,
  };

  const url = getAssetUrl(uuid, urlOptions);
  const category = getMimeCategory(mimeType);

  const context: AssetRenderContext = {
    uuid,
    url,
    mimeType,
    name,
    filename,
    version,
    token,
    className,
    alt,
  };

  // Check for custom renderer first
  const customRenderer = renderers[category];
  if (customRenderer) {
    return customRenderer(context);
  }

  // Use default renderer or fallback
  const renderer =
    defaultRenderers[category] ?? fallback ?? defaultFallbackRenderer;
  return renderer(context);
}

export default AssetRenderer;
