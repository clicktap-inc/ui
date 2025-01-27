'use client';

import { Pagination as UiPagination } from '@nextui-org/pagination';
import type { PaginationProps } from '@nextui-org/pagination';
import { cn } from '../../utils/cn';

const controlClassNames = cn(
  'w-8 h-8 flex justify-center items-center cursor-pointer shadow-none',
  'border border-slate-200 data-[disabled=true]:border-0',
  'rounded transition-colors duration-300 data-[focus-visible="true"]:outline-white data-[focus-visible="true"]:outline-offset-4',
  'hover:bg-slate-50 data-[disabled=true]:bg-slate-100 data-[disabled=true]:text-slate-400',
  '[&>svg]:w-4.5 [&>svg]:h-auto'
);

export function Pagination({
  showControls = true,
  className,
  classNames,
  ...rest
}: PaginationProps) {
  return (
    <UiPagination
      showControls={showControls}
      className={cn('text-slate-600', className)}
      classNames={{
        wrapper: cn('flex flex-nowrap gap-2 lg:gap-3', classNames?.wrapper),
        item: cn(
          'w-8 h-8 flex text-sm justify-center items-center cursor-pointer rounded shadow-none',
          'border-solid border border-slate-100 bg-transparent transition-colors duration-300',
          'data-[active=true]:bg-slate-500 data-[active=true]:text-white data-[focus-visible="true"]:outline-white data-[focus-visible="true"]:outline-offset-4',
          '[&[data-hover=true]:not([data-active=true])]:border-slate-200',
          classNames?.item
        ),
        prev: cn(controlClassNames, classNames?.prev),
        next: cn(controlClassNames, classNames?.next),
        ellipsis: cn('w-4 h-4.5 scale-110 translate-y-1', classNames?.ellipsis),
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}

export default Pagination;
