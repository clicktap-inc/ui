'use client';

import { ListBoxItem } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { OptionProps } from './Option.types';

export function Option({ className, ...props }: OptionProps) {
  return (
    <ListBoxItem
      {...props}
      className={cn(
        'flex flex-auto items-center',
        'rounded-md',
        'p-2.5 mx-1.5',
        'text-sm',
        'cursor-default',
        'outline-none',
        'text-slate-900',
        'transition-all ease-in-out duration-300',
        'data-[hovered]:bg-slate-100 data-[hovered]:text-slate-900',
        'data-[focused]:bg-slate-100 data-[hovered]:text-slate-900',
        'data-[pressed]:bg-slate-200 data-[hovered]:text-slate-900',
        'data-[selected]:bg-none data-[selected]:text-slate-900 data-[selected]:font-semibold data-[selected]:data-[focused]:bg-slate-100',
        'data-[disabled]:bg-none data-[disabled]:text-slate-500',
        className
      )}
    />
  );
}

export default Option;
