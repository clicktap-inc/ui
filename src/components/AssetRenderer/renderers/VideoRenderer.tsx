'use client';

import { getAssetUrl, type AssetUrlOptions } from '../../../utils/asset-url';

export interface VideoRendererProps {
  /** Asset UUID */
  uuid: string;
  /** Video mime type (e.g., 'video/mp4') */
  mimeType: string;
  /** Title for the video (accessibility) */
  title: string;
  /** Optional specific version */
  version?: number;
  /** Optional filename for URL */
  filename?: string;
  /** JWT token for authenticated access */
  token?: string;
  /** Optional poster image UUID */
  posterUuid?: string;
  /** Poster image options */
  posterOptions?: AssetUrlOptions;
  /** CSS class name */
  className?: string;
  /** Show video controls */
  controls?: boolean;
  /** Autoplay the video */
  autoPlay?: boolean;
  /** Loop the video */
  loop?: boolean;
  /** Mute the video */
  muted?: boolean;
  /** Preload strategy */
  preload?: 'none' | 'metadata' | 'auto';
  /** Width attribute */
  width?: number | string;
  /** Height attribute */
  height?: number | string;
}

/**
 * Renders a video asset with native HTML5 video player.
 *
 * @example
 * // Basic video
 * <VideoRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   mimeType="video/mp4"
 *   title="Product Demo"
 *   className="w-full max-w-2xl"
 * />
 *
 * @example
 * // With poster image and autoplay
 * <VideoRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   mimeType="video/mp4"
 *   title="Welcome Video"
 *   posterUuid="poster-uuid-here"
 *   autoPlay
 *   muted
 *   loop
 * />
 */
export function VideoRenderer({
  uuid,
  mimeType,
  title,
  version,
  filename,
  token,
  posterUuid,
  posterOptions,
  className,
  controls = true,
  autoPlay,
  loop,
  muted,
  preload,
  width,
  height,
}: VideoRendererProps) {
  const urlOptions: AssetUrlOptions = { version, filename, token };
  const url = getAssetUrl(uuid, urlOptions);

  const poster = posterUuid
    ? getAssetUrl(posterUuid, posterOptions)
    : undefined;

  return (
    <video
      controls={controls}
      poster={poster}
      title={title}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      preload={preload}
      width={width}
      height={height}
    >
      <source src={url} type={mimeType} />
      Your browser does not support the video element.
    </video>
  );
}

export default VideoRenderer;
