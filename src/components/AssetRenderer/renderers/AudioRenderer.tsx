'use client';

import { getAssetUrl, type AssetUrlOptions } from '../../../utils/asset-url';

export interface AudioRendererProps {
  /** Asset UUID */
  uuid: string;
  /** Audio mime type (e.g., 'audio/mpeg') */
  mimeType: string;
  /** Title for the audio (accessibility) */
  title: string;
  /** Optional specific version */
  version?: number;
  /** Optional filename for URL */
  filename?: string;
  /** JWT token for authenticated access */
  token?: string;
  /** CSS class name */
  className?: string;
  /** Show audio controls */
  controls?: boolean;
  /** Autoplay the audio */
  autoPlay?: boolean;
  /** Loop the audio */
  loop?: boolean;
  /** Mute the audio */
  muted?: boolean;
  /** Preload strategy */
  preload?: 'none' | 'metadata' | 'auto';
}

/**
 * Renders an audio asset with native HTML5 audio player.
 *
 * @example
 * // Basic audio player
 * <AudioRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   mimeType="audio/mpeg"
 *   title="Podcast Episode 1"
 *   className="w-full"
 * />
 *
 * @example
 * // With preload and loop
 * <AudioRenderer
 *   uuid="550e8400-e29b-41d4-a716-446655440000"
 *   mimeType="audio/wav"
 *   title="Background Music"
 *   preload="auto"
 *   loop
 * />
 */
export function AudioRenderer({
  uuid,
  mimeType,
  title,
  version,
  filename,
  token,
  className,
  controls = true,
  autoPlay,
  loop,
  muted,
  preload,
}: AudioRendererProps) {
  const urlOptions: AssetUrlOptions = { version, filename, token };
  const url = getAssetUrl(uuid, urlOptions);

  return (
    <audio
      controls={controls}
      title={title}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      preload={preload}
    >
      <source src={url} type={mimeType} />
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioRenderer;
