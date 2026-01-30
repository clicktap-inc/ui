'use client';

import type { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { cn } from '../../utils/cn';

export function Image({ src, className, style, ...rest }: ImageProps) {
  const [loadingImg, setLoadingImg] = useState(true);
  const [image, setImage] = useState(src);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setImage(src), [src]);
  useEffect(() => setIsClient(true), []);

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
      onError={() => setImage('/images/placeholder.jpg')}
      onLoad={() => setLoadingImg(false)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}

export default Image;
