'use client';

import { type ReactNode } from 'react';
import { getAssetUrl, type AssetUrlOptions } from '../../../utils/asset-url';

export interface DownloadLinkProps {
  /** Asset UUID */
  uuid: string;
  /** Display name for the download */
  name: string;
  /** Optional specific version */
  version?: number;
  /** Optional filename for URL and download attribute */
  filename?: string;
  /** JWT token for authenticated access */
  token?: string;
  /** CSS class name */
  className?: string;
  /** Custom children (defaults to "Download {name}") */
  children?: ReactNode;
}

/**
 * Renders a download link for an asset.
 *
 * @example
 * // Basic download link
 * <DownloadLink
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   name="Report.xlsx"
 *   className="text-blue-600 hover:underline"
 * />
 *
 * @example
 * // With custom content
 * <DownloadLink
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   name="Document"
 *   filename="important-document.pdf"
 * >
 *   <DownloadIcon /> Download Document
 * </DownloadLink>
 */
export function DownloadLink({
  uuid,
  name,
  version,
  filename,
  token,
  className,
  children,
}: DownloadLinkProps) {
  const urlOptions: AssetUrlOptions = {
    version,
    filename,
    token,
    download: true,
  };
  const url = getAssetUrl(uuid, urlOptions);

  return (
    <a href={url} download={filename ?? name} className={className}>
      {children ?? `Download ${name}`}
    </a>
  );
}

export default DownloadLink;
