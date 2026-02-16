'use client';

import type { ImageProps } from 'next/image';
import { Component, type ReactNode, useState } from 'react';
import NextImage from 'next/image';
import { cn } from '../../utils/cn';
import { useIsClient } from '../../hooks/useIsClient';

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

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Image] next/image render error, falling back to <img>:',
        error.message,
      );
    }
  }

  render() {
    if (this.state.hasError) {
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

  // Use placeholder if this specific src errored
  const image = errorSrc === src ? '/images/placeholder.jpg' : src;

  // When width/height are provided (not fill), ensure aspect ratio is maintained
  // by defaulting height to 'auto' if not explicitly set in style
  const hasSizedProps =
    'width' in rest && 'height' in rest && !('fill' in rest);
  const imageStyle = hasSizedProps
    ? { height: 'auto' as const, ...style }
    : style;

  const boundaryKey = typeof src === 'string' ? src : JSON.stringify(src);

  return (
    <ImageErrorBoundary
      key={boundaryKey}
      src={src}
      alt={rest.alt}
      className={className}
      style={imageStyle}
      width={'width' in rest ? rest.width : undefined}
      height={'height' in rest ? rest.height : undefined}
    >
      <NextImage
        src={image}
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
