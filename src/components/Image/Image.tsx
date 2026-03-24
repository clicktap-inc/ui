'use client';

import type { ImageProps } from 'next/image';
import { Component, type ReactNode, useRef, useState } from 'react';
import NextImage from 'next/image';
import { cn } from '../../utils/cn';

// Module-level cache of srcs that threw during render (e.g. unconfigured
// hostnames). Prevents re-render loops in dev mode where React Strict Mode
// and HotReload reset the error boundary and re-attempt NextImage.
const failedRenderSrcs = new Set<string>();

function getSrcKey(src: ImageProps['src']): string {
  return typeof src === 'string' ? src : JSON.stringify(src);
}

class ImageErrorBoundary extends Component<
  {
    src: ImageProps['src'];
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number | string;
    height?: number | string;
    children: ReactNode;
  },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      failedRenderSrcs.add(getSrcKey(this.props.src));
      const { src, alt, className, style, width, height } = this.props;
      const imgSrc =
        typeof src === 'string'
          ? src
          : typeof src === 'object' && 'src' in src
            ? src.src
            : '';
      return (
        <img
          src={imgSrc}
          alt={alt ?? ''}
          className={className}
          style={style}
          width={width}
          height={height}
          loading="lazy"
        />
      );
    }
    return this.props.children;
  }
}

export type ExtendedImageProps = ImageProps & {
  /** Reduce opacity to 50% (e.g., while waiting for data) */
  dimmed?: boolean;
  /** Hide image completely — opacity 0 (e.g., before grid rearrange) */
  hidden?: boolean;
  /** Fires when a new image has loaded after a src change */
  onReady?: () => void;
};

export function Image({
  src,
  className,
  style,
  dimmed,
  hidden,
  onReady,
  onLoad: externalOnLoad,
  ...rest
}: ExtendedImageProps) {
  const [loadingImg, setLoadingImg] = useState(true);
  const [errorSrc, setErrorSrc] = useState<typeof src | null>(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout>>();
  const currentSrc = useRef(src);
  const onReadyRef = useRef(onReady);
  // eslint-disable-next-line react-hooks/refs -- intentional: keep ref in sync without re-render
  onReadyRef.current = onReady;

  // Only manage opacity when extended props are used
  const managed =
    dimmed !== undefined || hidden !== undefined || onReady !== undefined;

  // Detect src change during render to prevent stale image flash.
  // Intentional ref access during render — React allows setState here
  // for derived state, and useEffect would cause a stale frame.
  if (managed) {
    const newKey = getSrcKey(src);
    // eslint-disable-next-line react-hooks/refs -- intentional: compare previous src during render
    const curKey = getSrcKey(currentSrc.current);
    if (newKey !== curKey) {
      // eslint-disable-next-line react-hooks/refs -- intentional: update ref during render
      currentSrc.current = src;
      setLoadingImg(true);
    }
  }

  // When width/height are provided (not fill), ensure aspect ratio is maintained
  // by defaulting height to 'auto' if not explicitly set in style
  const hasSizedProps =
    'width' in rest && 'height' in rest && !('fill' in rest);
  const imageStyle = hasSizedProps
    ? { height: 'auto' as const, ...style }
    : style;

  const srcKey = getSrcKey(src);

  // When next/image optimization fails (onError) or threw during render
  // (cached in failedRenderSrcs), bypass it entirely and render the original
  // src as a plain <img>.
  if (errorSrc === src || failedRenderSrcs.has(srcKey)) {
    const imgSrc =
      typeof src === 'string'
        ? src
        : typeof src === 'object' && 'src' in src
          ? src.src
          : '';
    return (
      <img
        src={imgSrc}
        alt={rest.alt ?? ''}
        className={className}
        style={imageStyle}
        width={'width' in rest ? rest.width : undefined}
        height={'height' in rest ? rest.height : undefined}
        loading="lazy"
      />
    );
  }

  return (
    <ImageErrorBoundary
      src={src}
      alt={rest.alt}
      className={className}
      style={imageStyle}
      width={'width' in rest ? rest.width : undefined}
      height={'height' in rest ? rest.height : undefined}
    >
      <NextImage
        src={src}
        className={cn(
          managed && 'transition-opacity duration-200 ease-in-out',
          className,
        )}
        style={{
          ...imageStyle,
          ...(managed
            ? {
                opacity: hidden ? 0 : loadingImg || dimmed ? 0.5 : 1,
              }
            : {}),
        }}
        onError={() => {
          // Debounce — Next.js image optimization can fire onError then
          // onLoad on the same image when a srcSet variant fails but
          // another succeeds. Only fall back if onLoad doesn't fire.
          errorTimer.current = setTimeout(() => setErrorSrc(src), 2000);
        }}
        onLoad={(e) => {
          clearTimeout(errorTimer.current);
          setLoadingImg(false);
          onReadyRef.current?.();
          if (typeof externalOnLoad === 'function') {
            externalOnLoad(e);
          }
        }}
        {...rest}
      />
    </ImageErrorBoundary>
  );
}

export default Image;
