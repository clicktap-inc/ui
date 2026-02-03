'use client';

import type { ImageProps } from 'next/image';
import { useState } from 'react';
import NextImage from 'next/image';
import { cn } from '../../utils/cn';
import { useIsClient } from '../../hooks/useIsClient';

export function Image({ src, className, style, ...rest }: ImageProps) {
  const [loadingImg, setLoadingImg] = useState(true);
  const [errorSrc, setErrorSrc] = useState<typeof src | null>(null);
  const isClient = useIsClient();

  // Use placeholder if this specific src errored
  const image = errorSrc === src ? '/images/placeholder.jpg' : src;

  // When width/height are provided (not fill), ensure aspect ratio is maintained
  // by setting both dimensions to 'auto' if not explicitly set in style
  const hasSizedProps =
    'width' in rest && 'height' in rest && !('fill' in rest);
  const imageStyle = hasSizedProps
    ? { width: 'auto' as const, height: 'auto' as const, ...style }
    : style;

  return (
    <NextImage
      src={image}
      className={cn(
        'transition-[filter] ease-linear duration-200',
        isClient && loadingImg && 'blur-md',
        className
      )}
      style={imageStyle}
      onError={() => setErrorSrc(src)}
      onLoad={() => setLoadingImg(false)}
      {...rest}
    />
  );
}

export default Image;
