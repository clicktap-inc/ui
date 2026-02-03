'use client';

import { Accordion as NextUiAccordion } from '@nextui-org/accordion';
import type { AccordionProps } from '@nextui-org/accordion';
import { cn } from '../../utils/cn';
import { DownArrow } from '../Icon/DownArrow';

export function Accordion({
  children,
  variant,
  isCompact,
  className,
  itemClasses,
  ...props
}: AccordionProps) {
  return (
    <NextUiAccordion
      variant={variant}
      isCompact={isCompact}
      dividerProps={{
        className: cn(
          'my-2 border-solid border-slate-200',
          variant === 'shadow' && 'border-slate-300'
        ),
      }}
      className={cn(
        'px-0',
        variant === 'bordered' && [
          'px-4 py-4 rounded-xl border-2 border-slate-200',
        ],
        variant === 'shadow' && [
          'px-4 py-4 rounded-xl bg-slate-100 shadow-slate-200 border border-slate-200',
        ],
        className
      )}
      itemClasses={{
        base: cn(
          'w-full py-2',
          'data-[disabled="true"]:pointer-events-none data-[disabled="true"]:opacity-50',
          variant === 'bordered' && ['rounded-xl py-0'],
          variant === 'splitted' && [
            'flex flex-col bg-slate-100 rounded-xl border border-slate-200',
          ],
          isCompact && 'py-0',
          itemClasses?.base
        ),
        trigger: cn(
          'w-full h-full flex items-center gap-3 py-0 appearance-none cursor-pointer select-none',
          'data-[focus-visible="true"]:outline-2 data-[focus-visible="true"]:outline data-[focus-visible="true"]:outline-slate-100',
          'bg-transparent text-inherit',
          isCompact && ['py-2'],
          itemClasses?.trigger
        ),
        title: cn(
          'text-xl font-semibold',
          isCompact && 'text-base',
          itemClasses?.title
        ),
        subtitle: cn(
          'text-base',
          isCompact && 'text-sm',
          itemClasses?.subtitle
        ),
        titleWrapper: cn('text-left', itemClasses?.titleWrapper),
        startContent: cn('shrink-0', itemClasses?.startContent),
        content: cn([isCompact ? 'py-1' : 'py-2'], itemClasses?.content),
        indicator: itemClasses?.indicator,
        heading: itemClasses?.heading,
      }}
      {...props}
    >
      {children}
    </NextUiAccordion>
  );
}

export default Accordion;

export function AccordionItemArrow() {
  return <DownArrow className="w-4 h-4" />;
}
