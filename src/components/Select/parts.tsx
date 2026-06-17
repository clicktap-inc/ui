'use client';

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  DismissButton,
  Overlay,
  useListBox,
  useOption,
  usePopover,
  type AriaListBoxOptions,
} from 'react-aria';
import type { ListState, Node, OverlayTriggerState } from 'react-stately';
import { cn } from '../../utils/cn';
import type { SelectSlots } from './Select.types';

// Shared option + listbox rendering for BOTH select modes. `useOption` /
// `useListBox` take a `ListState`, which both `ComboBoxState` (searchable) and
// `SelectState` (button) satisfy — so one renderer + one <Option> serves both.

export function SelectOption<T extends object>({
  item,
  state,
  shouldUseVirtualFocus,
  className,
}: {
  item: Node<T>;
  state: ListState<T>;
  // Combobox forces virtual focus so the focused option is tracked via
  // aria-activedescendant and DOM focus stays on the input (typing keeps
  // working). Passed straight to useOption (it takes priority over the
  // listbox-level value), so it can't be lost in prop plumbing.
  shouldUseVirtualFocus?: boolean;
  // Consumer override (`classNames.option`). Merged LAST so twMerge lets it win
  // over the defaults — including the focus/selected/disabled states, which are
  // emitted as `data-*` variants (not conditional classes) precisely so a
  // consumer can retarget them, e.g. `data-[focused]:bg-zinc-800` for dark mode.
  className?: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isFocused, isSelected, isDisabled } = useOption(
    { key: item.key, shouldUseVirtualFocus },
    state,
    ref,
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      data-focused={isFocused || undefined}
      data-selected={isSelected || undefined}
      data-disabled={isDisabled || undefined}
      className={cn(
        'flex flex-auto items-center',
        'rounded-md',
        'p-2.5 mx-1.5',
        'text-sm',
        'cursor-default outline-none',
        'text-slate-900',
        'transition-all ease-in-out duration-150',
        'data-[focused]:bg-slate-100',
        'data-[selected]:font-semibold',
        'data-[disabled]:text-slate-500',
        className,
      )}
    >
      {item.rendered}
    </li>
  );
}

export function SelectListBox<T extends object>({
  state,
  listBoxProps,
  listBoxRef,
  className,
  optionClassName,
  optionVirtualFocus,
}: {
  state: ListState<T>;
  listBoxProps: AriaListBoxOptions<T>;
  listBoxRef: RefObject<HTMLUListElement>;
  className?: string;
  // `classNames.option` — applied to each row's <li>.
  optionClassName?: string;
  optionVirtualFocus?: boolean;
}) {
  const { listBoxProps: ariaListBoxProps } = useListBox(
    listBoxProps,
    state,
    listBoxRef,
  );

  return (
    <ul {...ariaListBoxProps} ref={listBoxRef} className={className}>
      {[...state.collection].map((item) => (
        <SelectOption
          key={item.key}
          item={item}
          state={state}
          shouldUseVirtualFocus={optionVirtualFocus}
          className={optionClassName}
        />
      ))}
    </ul>
  );
}

// Inline dropdown surface — used by the BUTTON select (no Tab-advance, no focus
// trap interaction expected). The SEARCHABLE select uses SelectOverlay instead.
export function SelectPopover({
  children,
  popoverRef,
  offset,
  className,
}: {
  children: ReactNode;
  popoverRef: RefObject<HTMLDivElement>;
  offset?: number;
  className?: string;
}) {
  return (
    <div
      ref={popoverRef}
      style={{ marginTop: offset ?? 4 }}
      className={cn(
        'absolute top-full left-0 z-50 w-full',
        'px-0 py-1.5',
        'rounded-md bg-white',
        'border border-solid border-slate-300',
        'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

// Portaled dropdown surface for the SEARCHABLE select. usePopover renders into
// the overlay top layer (outside any FocusScope/focus-trap a modal sets up), so
// it works inside Dialogs/Drawers — the inline version fights the trap's Tab
// handling. isNonModal keeps DOM focus on the input (virtual focus / typing) and
// lets Tab advance to the next field; it closes on blur/Esc/scroll, so no
// container-scoped interact-outside is needed (which would mis-fire now that the
// list lives outside the field's DOM subtree).
export function SelectOverlay({
  state,
  triggerRef,
  popoverRef,
  offset,
  className,
  children,
}: {
  state: OverlayTriggerState;
  triggerRef: RefObject<HTMLElement>;
  popoverRef: RefObject<HTMLDivElement>;
  offset?: number;
  className?: string;
  children: ReactNode;
}) {
  const { popoverProps } = usePopover(
    {
      triggerRef,
      popoverRef,
      isNonModal: true,
      placement: 'bottom start',
      offset: offset ?? 4,
    },
    state,
  );

  // Match the trigger field's width (usePopover only sets position). Measured in
  // a layout effect (not during render) so it's applied before paint — no flash,
  // no reading a ref during render. This component only mounts while open.
  const [width, setWidth] = useState<number>();
  useLayoutEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef]);

  return (
    <Overlay>
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{
          ...popoverProps.style,
          width,
        }}
        className={cn(
          'z-50',
          'px-0 py-1.5',
          'rounded-md bg-white',
          'border border-solid border-slate-300',
          'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
          className,
        )}
      >
        <DismissButton onDismiss={() => state.close()} />
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
}

export function ChevronIcon({
  isOpen,
  isDisabled,
  isInvalid,
  buttonIcon,
}: {
  isOpen: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  buttonIcon?: SelectSlots<object>['buttonIcon'];
}): ReactNode {
  if (buttonIcon) {
    return typeof buttonIcon === 'function'
      ? buttonIcon({ isOpen, isDisabled, isInvalid } as never)
      : buttonIcon;
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'transition-all ease-in-out duration-200',
        isOpen ? 'rotate-180' : 'rotate-0',
      )}
    >
      <path
        d="M6 9L12 15L18 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn([
          'stroke-slate-900',
          isDisabled && 'stroke-slate-400',
          isInvalid && 'stroke-red-500',
        ])}
      />
    </svg>
  );
}
