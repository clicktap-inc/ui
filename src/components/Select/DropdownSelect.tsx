'use client';

import {
  Select as AriaSelect,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
} from 'react-aria-components';
import type {
  SelectProps as AriaSelectProps,
  Key,
} from 'react-aria-components';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type DropdownSelectProps<T extends object> = Omit<
  AriaSelectProps<T>,
  'children'
> & {
  label?: string;
  placeholder?: string;
  children: ReactNode;
  className?: string;
  classNames?: {
    trigger?: string;
    label?: string;
    value?: string;
    listContainer?: string;
    list?: string;
  };
};

export function DropdownSelect<T extends object>({
  label,
  placeholder,
  children,
  className,
  classNames,
  ...props
}: DropdownSelectProps<T>) {
  return (
    <AriaSelect {...props} className={cn('flex items-center gap-2', className)}>
      {label && (
        <Label className={cn('text-xs text-slate-500', classNames?.label)}>
          {label}
        </Label>
      )}
      <Button
        className={cn(
          'flex items-center justify-between',
          'border border-solid border-slate-300',
          'text-sm text-slate-900',
          'py-0 px-3',
          'h-10',
          'rounded-md',
          'bg-white',
          'cursor-pointer',
          'transition-all ease-in-out duration-200',
          'data-[hovered]:border-slate-400',
          'data-[focused]:border-slate-400 data-[focused]:outline data-[focused]:outline-2 data-[focused]:outline-slate-200',
          classNames?.trigger,
        )}
      >
        <SelectValue className={cn('text-sm truncate', classNames?.value)}>
          {({ isPlaceholder, selectedText }) => (
            <span className={isPlaceholder ? 'text-slate-400' : ''}>
              {isPlaceholder ? (placeholder ?? 'Select...') : selectedText}
            </span>
          )}
        </SelectValue>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 ml-2"
        >
          <path
            d="M6 9L12 15L18 9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-slate-900"
          />
        </svg>
      </Button>
      <Popover
        className={cn(
          'px-0 py-1.5',
          'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
          'rounded-md',
          'w-[var(--trigger-width)]',
          'bg-white',
          'border border-solid border-slate-300',
          classNames?.listContainer,
        )}
      >
        <ListBox
          className={cn(
            'max-h-80 overflow-y-auto outline-none',
            classNames?.list,
          )}
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
