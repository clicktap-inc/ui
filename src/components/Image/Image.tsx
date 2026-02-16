'use client';

import type { ImageProps } from 'next/image';
import { Component, type ReactNode, useState } from 'react';
import NextImage from 'next/image';
import { cn } from '../../utils/cn';
import { useIsClient } from '../../hooks/useIsClient';

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

export function Image({ src, className, style, ...rest }: ImageProps) {
  const [loadingImg, setLoadingImg] = useState(true);
  const [errorSrc, setErrorSrc] = useState<typeof src | null>(null);
  const isClient = useIsClient();

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
      key={srcKey}
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
          'transition-[filter] ease-linear duration-200',
          isClient && loadingImg && 'blur-md',
          className,
        )}
        style={imageStyle}
        onError={() => setErrorSrc(src)}
        onLoad={() => setLoadingImg(false)}
        {...rest}
      />
    </ImageErrorBoundary>
  );
}

export default Image;
