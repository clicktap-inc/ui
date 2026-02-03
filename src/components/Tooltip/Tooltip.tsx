'use client';

import { forwardRef } from 'react';
import { Tooltip as UiTooltip } from '@nextui-org/tooltip';
import { cn } from '../../utils/cn';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    { classNames, placement, showArrow = false, ...props },
    ref
  ) {
    return (
      <UiTooltip
        classNames={{
          base: [
            cn([
              'z-0 relative bg-transparent outline-none',
              'focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500',

              // arrow styles
              'before:absolute before:rotate-45 before:w-2.5 before:h-2.5 before:rounded-sm before:bg-slate-500 before:shadow-sm',
              'before:hidden data-[arrow=true]:before:block',
              'data-[placement=bottom]:before:-top-1 data-[placement=bottom]:before:left-1/2 data-[placement=bottom]:before:rotate-45 data-[placement=bottom]:before:-translate-x-1/2',
              'data-[placement=bottom-end]:before:-top-1 data-[placement=bottom-end]:before:left-1/2 data-[placement=bottom-end]:before:rotate-45 data-[placement=bottom-end]:before:-translate-x-1/2',
              'data-[placement=bottom-start]:before:-top-1 data-[placement=bottom-start]:before:left-1/2 data-[placement=bottom-start]:before:rotate-45 data-[placement=bottom-start]:before:-translate-x-1/2',
              'data-[placement=left]:before:-right-1 data-[placement=left]:before:top-1/2 data-[placement=left]:before:-translate-y-1/2',
              'data-[placement=left-end]:before:-right-1 data-[placement=left-end]:before:top-1/2 data-[placement=left-end]:before:-translate-y-1/2',
              'data-[placement=left-start]:before:-right-1 data-[placement=left-start]:before:top-1/2 data-[placement=left-start]:before:-translate-y-1/2',
              'data-[placement=right]:before:-left-1 data-[placement=right]:before:top-1/2 data-[placement=right]:before:-translate-y-1/2',
              'data-[placement=right-end]:before:-left-1 data-[placement=right-end]:before:top-1/2 data-[placement=right-end]:before:-translate-y-1/2',
              'data-[placement=right-start]:before:-left-1 data-[placement=right-start]:before:top-1/2 data-[placement=right-start]:before:-translate-y-1/2',
              'data-[placement=top]:before:-bottom-1 data-[placement=top]:before:left-1/2 data-[placement=top]:before:rotate-45 data-[placement=top]:before:-translate-x-1/2',
              'data-[placement=top-end]:before:-bottom-1 data-[placement=top-end]:before:left-1/2 data-[placement=top-end]:before:rotate-45 data-[placement=top-end]:before:-translate-x-1/2',
              'data-[placement=top-start]:before:-bottom-1 data-[placement=top-start]:before:left-1/2 data-[placement=top-start]:before:rotate-45 data-[placement=top-start]:before:-translate-x-1/2',

              classNames?.base,
            ]),
          ],
          content: [
            cn([
              'inline-flex flex-col items-center justify-center outline-none',
              'w-full py-1 px-2.5 z-10 box-border bg-slate-500 rounded-md shadow-sm',
              'text-sm text-white subpixel-antialiased',
              classNames?.content,
            ]),
          ],
        }}
        placement={placement}
        showArrow={showArrow}
        {...props}
        ref={ref}
      />
    );
  }
);

export default Tooltip;
