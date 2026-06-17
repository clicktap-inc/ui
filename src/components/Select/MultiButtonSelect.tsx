'use client';

import { useRef } from 'react';
import { useButton, type AriaListBoxOptions } from 'react-aria';
import { useListState, useOverlayTriggerState } from 'react-stately';
import type { Key } from 'react-aria-components';
import { cn } from '../../utils/cn';
import { ChevronIcon, SelectListBox, SelectOverlay } from './parts';
import type { SelectBaseProps, SelectProps } from './Select.types';

// Non-searchable MULTI-select: a button whose summary shows the chosen options,
// opening a listbox where clicking toggles each (the menu stays open). Built on
// `useListState({ selectionMode: 'multiple' })` because `useSelectState` (the
// single button select) can't hold multiple values. Shares the option/listbox
// renderer + portaled overlay with the other modes.
//
// Single-button vs combobox-multi: this is for short, fixed lists you multi-pick
// without typing; for long lists use `searchable selectionMode="multiple"`.
//
// Form note: there is no hidden native <select> here (HiddenSelect needs a
// SelectState, not a ListState), so this doesn't participate in native form
// submission / autofill. Multi-select is consumed via selectedKeys/onSelectionChange.
export function MultiButtonSelect<T extends object>(props: SelectProps<T>) {
  const {
    label,
    description,
    errorMessage,
    children,
    placeholder,
    slots,
    popoverOffset,
    className,
    classNames,
    isLoading,
    items,
    isInvalid: isInvalidProp,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
  } = props as SelectBaseProps<T> & {
    selectedKeys?: Iterable<Key>;
    defaultSelectedKeys?: Iterable<Key>;
    onSelectionChange?: (keys: Key[]) => void;
  };

  const isDisabled = Boolean(props.isDisabled || isLoading);

  const listState = useListState<T>({
    children: children as never,
    items,
    selectionMode: 'multiple',
    // 'toggle' (the default): each click adds/removes that option and the menu
    // stays open (we never close on select), so you accumulate picks and click
    // away to close — the button summary reflects the final selection.
    selectionBehavior: 'toggle',
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange: (keys) => {
      // 'all' is impossible without a select-all affordance, but TS includes it.
      if (keys === 'all') {
        return;
      }
      onSelectionChange?.([...keys]);
    },
  });

  const triggerState = useOverlayTriggerState({});

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { buttonProps } = useButton(
    {
      isDisabled,
      onPress: () => triggerState.toggle(),
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
    },
    buttonRef,
  );

  // No container-scoped interact-outside: SelectOverlay portals the listbox OUT
  // of containerRef, so such a handler would treat every option click as
  // "outside" and close the menu. SelectOverlay's usePopover handles dismissal —
  // clicking an option keeps focus in the listbox (stays open); clicking away
  // blurs it and closes. Esc closes too.
  const isInvalid = Boolean(isInvalidProp);
  // Summary in COLLECTION order (the order options appear in the list), not
  // selection order — so it reads consistently regardless of click sequence.
  // Iterate the collection's keys (document order, includes section headers) and
  // keep the selected option rows.
  const selectedItems = [...listState.collection.getKeys()]
    .map((key) => listState.collection.getItem(key))
    .filter(
      (item): item is NonNullable<typeof item> =>
        item != null &&
        item.type === 'item' &&
        listState.selectionManager.isSelected(item.key),
    );
  const summary = selectedItems.map((item) => item.textValue).join(', ');

  return (
    <div
      ref={containerRef}
      className={cn('flex flex-col', 'w-full', className)}
    >
      <label
        className={cn('flex', 'text-xs text-slate-500', classNames?.label)}
      >
        {label}
      </label>
      <div
        className={cn(
          'flex',
          'relative',
          'w-full',
          classNames?.comboBoxContainer,
        )}
      >
        <button
          {...buttonProps}
          ref={buttonRef}
          aria-haspopup="listbox"
          aria-expanded={triggerState.isOpen}
          className={cn(
            'flex items-center justify-between gap-2',
            'border border-solid border-slate-300',
            'text-sm text-slate-900 text-left',
            'py-0 px-3',
            'h-10 w-full',
            'm-0',
            'rounded-md',
            'bg-white',
            'cursor-pointer',
            'transition-all ease-in-out duration-200',
            'hover:border-slate-400',
            'focus:outline focus:outline-2 focus:outline-slate-200 focus:border-slate-400',
            'disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-default',
            isInvalid &&
              'border-red-500 bg-red-100 text-red-600 hover:border-red-600 focus:border-red-600 focus:outline-red-200',
            classNames?.input,
          )}
        >
          <span
            className={cn(
              'truncate',
              selectedItems.length === 0 && 'text-slate-400',
              classNames?.value,
            )}
          >
            {selectedItems.length > 0 ? summary : (placeholder ?? 'Select...')}
          </span>
          <span
            className={cn(
              'shrink-0 [&_svg]:w-4 [&_svg]:h-4',
              classNames?.arrowButton,
            )}
          >
            <ChevronIcon
              isOpen={triggerState.isOpen}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              buttonIcon={slots?.buttonIcon}
            />
          </span>
        </button>

        {triggerState.isOpen && (
          <SelectOverlay
            state={triggerState}
            triggerRef={buttonRef}
            popoverRef={popoverRef}
            offset={popoverOffset}
            className={cn(classNames?.listContainer)}
          >
            <SelectListBox
              state={listState}
              // selectionBehavior lives on the state (above); here we just focus
              // the first option on open. SelectListBox calls useListBox with these.
              listBoxProps={
                {
                  'aria-label': label ?? ariaLabel ?? 'Options',
                  autoFocus: 'first',
                  shouldFocusWrap: true,
                } as AriaListBoxOptions<T>
              }
              listBoxRef={listBoxRef}
              optionClassName={cn(classNames?.option)}
              sectionHeadingClassName={cn(classNames?.sectionHeading)}
              className={cn(
                'max-h-80',
                'overflow-y-auto',
                'outline-none',
                classNames?.list,
              )}
            />
          </SelectOverlay>
        )}
      </div>
      {description && (
        <span
          className={cn(
            'flex',
            'text-xs',
            'text-slate-500',
            classNames?.description,
          )}
        >
          {description}
        </span>
      )}
      {isInvalid && typeof errorMessage === 'string' && (
        <span
          className={cn(
            'flex',
            'text-xs',
            'text-red-500',
            classNames?.errorMessage,
          )}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default MultiButtonSelect;
