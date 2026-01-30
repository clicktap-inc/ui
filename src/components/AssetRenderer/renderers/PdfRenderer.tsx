'use client';

import { getAssetUrl, type AssetUrlOptions } from '../../../utils/asset-url';

export interface PdfRendererProps {
  /** Asset UUID */
  uuid: string;
  /** Title for the PDF viewer (accessibility) */
  title: string;
  /** Optional specific version */
  version?: number;
  /** Optional filename for URL */
  filename?: string;
  /** JWT token for authenticated access */
  token?: string;
  /** CSS class name */
  className?: string;
  /** Width attribute */
  width?: number | string;
  /** Height attribute */
  height?: number | string;
  /**
   * PDF viewer options (appended to URL fragment)
   * @see https://pdfobject.com/pdf/pdf_open_parameters_acro8.pdf
   */
  viewerOptions?: PdfViewerOptions;
}

export interface PdfViewerOptions {
  /** Initial page number */
  page?: number;
  /** Initial zoom level (e.g., 100, 'fit', 'fitH', 'fitV') */
  zoom?: number | 'fit' | 'fitH' | 'fitV' | 'fitB' | 'fitBH' | 'fitBV';
  /** Page mode (e.g., 'none', 'thumbs', 'bookmarks') */
  pagemode?: 'none' | 'thumbs' | 'bookmarks' | 'attachments';
  /** Show toolbar */
  toolbar?: boolean;
  /** Show navigation panes */
  navpanes?: boolean;
  /** Show scrollbar */
  scrollbar?: boolean;
  /** Show status bar */
  statusbar?: boolean;
  /** Show messages */
  messages?: boolean;
}

/**
 * Build PDF viewer fragment from options.
 */
function buildPdfFragment(options: PdfViewerOptions): string {
  const params: string[] = [];

  if (options.page !== undefined) {
    params.push(`page=${options.page}`);
  }
  if (options.zoom !== undefined) {
    params.push(`zoom=${options.zoom}`);
  }
  if (options.pagemode !== undefined) {
    params.push(`pagemode=${options.pagemode}`);
  }
  if (options.toolbar !== undefined) {
    params.push(`toolbar=${options.toolbar ? 1 : 0}`);
  }
  if (options.navpanes !== undefined) {
    params.push(`navpanes=${options.navpanes ? 1 : 0}`);
  }
  if (options.scrollbar !== undefined) {
    params.push(`scrollbar=${options.scrollbar ? 1 : 0}`);
  }
  if (options.statusbar !== undefined) {
    params.push(`statusbar=${options.statusbar ? 1 : 0}`);
  }
  if (options.messages !== undefined) {
    params.push(`messages=${options.messages ? 1 : 0}`);
  }

  return params.length > 0 ? `#${params.join('&')}` : '';
}

/**
 * Renders a PDF asset in an iframe with native browser PDF viewer.
 *
 * @example
 * // Basic PDF embed
 * <PdfRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   title="Annual Report 2024"
 *   className="w-full h-[800px] border-0"
 * />
 *
 * @example
 * // With viewer options
 * <PdfRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   title="Contract"
 *   viewerOptions={{
 *     page: 2,
 *     zoom: 'fit',
 *     toolbar: true,
 *     navpanes: false,
 *   }}
 * />
 */
export function PdfRenderer({
  uuid,
  title,
  version,
  filename,
  token,
  className,
  width,
  height,
  viewerOptions,
}: PdfRendererProps) {
  const urlOptions: AssetUrlOptions = { version, filename, token };
  let url = getAssetUrl(uuid, urlOptions);

  if (viewerOptions) {
    url += buildPdfFragment(viewerOptions);
  }

  return (
    <iframe
      src={url}
      title={title}
      className={className}
      width={width}
      height={height}
    />
  );
}

export default PdfRenderer;
