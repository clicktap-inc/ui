import { useEffect, useState, useCallback } from 'react';

interface UseAssetDownloadOptions {
  url: string;
  filename: string;
  autoDownload?: boolean;
  headers?: Record<string, string>;
}

interface UseAssetDownloadResult {
  downloadStarted: boolean;
  isDownloading: boolean;
  error: Error | null;
  triggerDownload: () => Promise<void>;
}

export function useAssetDownload({
  url,
  filename,
  autoDownload = true,
  headers = {},
}: UseAssetDownloadOptions): UseAssetDownloadResult {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const triggerDownload = useCallback(async () => {
    try {
      setIsDownloading(true);
      setError(null);

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setDownloadStarted(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Download failed'));
    } finally {
      setIsDownloading(false);
    }
  }, [url, filename, headers]);

  useEffect(() => {
    if (autoDownload && !downloadStarted && !isDownloading) {
      triggerDownload().catch(() => {
        // Error is already handled in triggerDownload via setError
      });
    }
  }, [autoDownload, downloadStarted, isDownloading, triggerDownload]);

  return { downloadStarted, isDownloading, error, triggerDownload };
}

export default useAssetDownload;
