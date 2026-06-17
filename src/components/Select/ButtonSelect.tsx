'use client';

import { useRef } from 'react';
import {
  HiddenSelect,
  useButton,
  useSelect,
  type AriaListBoxOptions,
} from 'react-aria';
import { useInteractOutside } from '@react-aria/interactions';
import { useSelectState } from 'react-stately';
import { cn } from '../../utils/cn';
import { ChevronIcon, SelectListBox, SelectPopover } from './parts';
import type { SelectProps } from './Select.types';

// Non-searchable mode: react-stately `useSelectState` + react-aria `useSelect`,
// rendered as a button that shows the selected value (no text input). Same
// react-stately Item collection + same <Option> + same listbox renderer as the
// searchable mode. List is inline (no overlay), matching the combobox.
export function ButtonSelect<T extends object>(props: SelectProps<T>) {
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
    name,
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
    isRequired,
    items,
    autoFocus,
    isInvalid: isInvalidProp,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  } = props;

  const isDisabled = Boolean(props.isDisabled || isLoading);

  const stateProps = {
    label,
    children: children as never,
    items,
    name,
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
    isDisabled,
    isRequired,
    autoFocus,
    isInvalid: isInvalidProp,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  };

  const state = useSelectState<T>(stateProps);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
  } = useSelect(stateProps, state, buttonRef);

  const { buttonProps } = useButton(triggerProps, buttonRef);

  useInteractOutside({
    ref: containerRef,
    onInteractOutside: () => state.close(),
  });

  return (
    <div
      ref={containerRef}
      className={cn('flex flex-col', 'w-full', className)}
    >
      <label
        {...labelProps}
        className={cn('flex', 'text-xs text-slate-500', classNames?.label)}
      >
        {label}
      </label>
      <HiddenSelect
        state={state}
        triggerRef={buttonRef}
        label={label}
        name={name}
        isDisabled={isDisabled}
      />
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
            {...valueProps}
            className={cn(
              'truncate',
              !state.selectedItem && 'text-slate-400',
              classNames?.value,
            )}
          >
            {state.selectedItem
              ? state.selectedItem.rendered
              : (placeholder ?? 'Select...')}
          </span>
          <span
            className={cn(
              'shrink-0 [&_svg]:w-4 [&_svg]:h-4',
              classNames?.arrowButton,
            )}
          >
            <ChevronIcon
              isOpen={state.isOpen}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              buttonIcon={slots?.buttonIcon}
            />
          </span>
        </button>

        {state.isOpen && (
          <SelectPopover
            popoverRef={popoverRef}
            offset={popoverOffset}
            className={cn(classNames?.listContainer)}
          >
            <SelectListBox
              state={state}
              listBoxProps={menuProps as AriaListBoxOptions<T>}
              listBoxRef={listBoxRef}
              optionClassName={cn(classNames?.option)}
              className={cn(
                'max-h-80',
                'overflow-y-auto',
                'outline-none',
                classNames?.list,
              )}
            />
          </SelectPopover>
        )}
      </div>
      {description && (
        <span
          {...descriptionProps}
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
          {...errorMessageProps}
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

export default ButtonSelect;
