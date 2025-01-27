'use client';

import type { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { cn } from '../../utils/cn';

export function Image({ src, className, ...rest }: ImageProps) {
  const [loadingImg, setLoadingImg] = useState(true);
  const [image, setImage] = useState(src);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setImage(src), [src]);
  useEffect(() => setIsClient(true), []);

  return (
    <NextImage
      src={image}
      className={cn(
        'transition-[filter] ease-linear duration-200',
        isClient && loadingImg && 'blur-md',
        className
      )}
      onError={() => setImage('/images/placeholder.jpg')}
      onLoad={() => setLoadingImg(false)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}

export default Image;
