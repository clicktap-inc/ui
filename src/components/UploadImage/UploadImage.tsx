'use client';

import { forwardRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { FieldError } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { UploadImageProps } from './UploadImage.types';
import { useIsClient } from '../../hooks/useIsClient';
import { Skeleton } from '../Skeleton';

function UploadImageLoader({
  hasTitle,
  className,
}: {
  hasTitle: boolean;
  className: NonNullable<UploadImageProps['classNames']>['skeleton'];
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {hasTitle && <Skeleton className="w-1/2 h-8 mx-auto rounded-md z-20" />}
      <Skeleton
        className={cn('w-full h-56 rounded-md z-20 relative', className)}
      />
    </div>
  );
}

export const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
  (
    {
      title,
      description = 'Preview will display here.',
      fileExtension,
      actionTitle = 'select file',
      variant,
      errorMessage,
      defaultImagePath,
      classNames,
      ...props
    },
    ref
  ) => {
    const isClient = useIsClient();
    const [image, setImage] = useState<{
      src: string | null;
      alt: string | null;
    }>({
      src: null,
      alt: null,
    });

    const invalid = !!errorMessage;

    const accept = fileExtension
      ? fileExtension
          .split(',')
          .map((val) => `image/${val.trim()}`)
          .join(', ')
      : 'image/*';

    return (
      <div className={cn('w-full h-full', 'flex flex-col gap-4')}>
        {isClient ? (
          <>
            {title && (
              <h6 className={cn('text-center', 'text-2xl', 'm-0 mb-4')}>
                {title}
              </h6>
            )}
            <div
              className={cn(
                'w-full h-full',
                'flex flex-col justify-between gap-5 items-center',
                ['bg-slate-100', variant === 'base' && 'bg-transparent'],
                'rounded-md',
                [variant === 'base' && 'rounded-none'],
                ['p-6 lg:p-7', variant === 'base' && 'p-0 lg:p-0']
              )}
            >
              <label
                htmlFor={`${props?.name}-upload-file`}
                aria-label="image upload"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const {
                    target: { files },
                  } = e;
                  if (files) {
                    setImage({
                      src: URL.createObjectURL(files[0]),
                      alt: files[0].name,
                    });
                  }
                }}
                className={cn(
                  'inline-flex justify-center items-center',
                  'uppercase text-base border-slate-200',
                  'bg-transparent',
                  'border-1 border-solid',
                  'px-4 py-0',
                  'rounded-2xl',
                  'cursor-pointer',
                  'w-full h-9',
                  ['max-w-48', variant === 'base' && 'max-w-none'],
                  'my-0 mx-auto',
                  'has-[:disabled]:bg-transparent has-[:disabled]:text-slate-950',
                  'hover:bg-slate-100s hover:text-black',
                  classNames?.label
                )}
              >
                {actionTitle}
                <input
                  id={`${props?.name}-upload-file`}
                  accept={accept}
                  type="file"
                  hidden
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...props}
                  ref={ref}
                  className="hidden"
                />
              </label>

              {defaultImagePath && !image.src ? (
                <div className="flex justify-center items-center w-60">
                  <a href={defaultImagePath} target="_blank" rel="noreferrer">
                    <img
                      src={defaultImagePath}
                      alt=""
                      className="w-full h-auto"
                    />
                  </a>
                </div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', duration: 3, bounce: 0 }}
                    key={image.src}
                    className="flex justify-center items-center w-52 h-auto"
                  >
                    {image.src ? (
                      <Image
                        src={image.src}
                        height={96}
                        width={200}
                        alt={image.alt || ''}
                        className="max-h-full object-contain"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="55"
                        viewBox="0 0 31 55"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_15607_32844)">
                          <path
                            d="M15.9521 0.721924C24.2431 0.721924 30.9521 7.36392 30.9521 15.5719V43.9219C30.9521 49.8889 26.0703 54.7219 20.0431 54.7219C14.0158 54.7219 9.13397 49.8889 9.13397 43.9219V20.9719C9.13397 17.2459 12.1885 14.2219 15.9521 14.2219C19.7158 14.2219 22.7703 17.2459 22.7703 20.9719V41.2219H17.3158V20.7289C17.3158 19.2439 14.5885 19.2439 14.5885 20.7289V43.9219C14.5885 46.8919 17.0431 49.3219 20.0431 49.3219C23.0431 49.3219 25.4976 46.8919 25.4976 43.9219V15.5719C25.4976 10.3609 21.2158 6.12192 15.9521 6.12192C10.6885 6.12192 6.40669 10.3609 6.40669 15.5719V41.2219H0.952148V15.5719C0.952148 7.36392 7.66124 0.721924 15.9521 0.721924Z"
                            fill="#646464"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_15607_32844">
                            <rect
                              width="30"
                              height="54"
                              fill="white"
                              transform="translate(0.952148 0.721924)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </motion.div>
                  <p className="m-0 text-slate-950 text-center">
                    {image.alt || description}
                  </p>
                </>
              )}
            </div>
          </>
        ) : (
          <UploadImageLoader
            hasTitle={Boolean(title)}
            className={classNames?.skeleton}
          />
        )}

        {invalid && (
          <FieldError className={cn('-mt-2', 'self-start')}>
            {errorMessage}
          </FieldError>
        )}
      </div>
    );
  }
);

export default UploadImage;
