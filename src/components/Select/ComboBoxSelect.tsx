'use client';

import {
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type ForwardedRef,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  HiddenSelect,
  useButton,
  useComboBox,
  useFilter,
  useObjectRef,
  type AriaListBoxOptions,
} from 'react-aria';
import {
  useComboBoxState,
  type ComboBoxState,
  type Key,
  type Node,
  type SelectState,
} from 'react-stately';
import { cn } from '../../utils/cn';
import { Pulse } from '../Loader';
import { ChevronIcon, SelectListBox, SelectOverlay, SelectTags } from './parts';
import { Section } from './Option';
import type { SelectBaseProps, SelectProps } from './Select.types';

// The text to DISPLAY for an option in the input. Options may set `textValue` to
// include search aliases (e.g. "Texas TX US-TX") so typing a code filters to the
// row — but the field should show only the name. Prefer the rendered string
// (the option's children); fall back to textValue when children isn't a string.
function itemDisplayText<T>(item: Node<T> | null | undefined): string {
  if (!item) {
    return '';
  }
  return typeof item.rendered === 'string'
    ? item.rendered
    : (item.textValue ?? '');
}

// The key to highlight while filtering. Walks the (filtered) collection in
// document order, skipping <Section> headers, and PREFERS an exact match — an
// option whose textValue has a whitespace token equal to the query (e.g. a code:
// "United States of America us" matches input "us"). This beats a mid-word
// substring hit (typing "us" otherwise highlights "Belarus", the alphabetically
// first match). Falls back to the first option when nothing matches exactly.
function highlightKey<T>(
  collection: {
    getFirstKey: () => Key | null;
    getKeyAfter: (key: Key) => Key | null;
    getItem: (key: Key) => Node<T> | null;
  },
  inputValue: string,
): Key | null {
  const query = inputValue.trim().toLowerCase();
  let firstItem: Key | null = null;
  let key = collection.getFirstKey();
  while (key != null) {
    const node = collection.getItem(key);
    if (node?.type === 'item') {
      if (firstItem == null) {
        firstItem = key;
      }
      if (
        query.length > 0 &&
        (node.textValue ?? '').toLowerCase().split(/\s+/).includes(query)
      ) {
        return key;
      }
    }
    key = collection.getKeyAfter(key);
  }
  return firstItem;
}

// Relevance rank of an option's searchable text against the query (lower = more
// relevant): exact whitespace-token match (a code like "us") → prefix of the
// whole value → prefix of any word → mid-word substring. So "us" ranks
// United States (token "us") and "Usbekistan" (prefix) above "Belarus" (substring).
function matchRank(textValue: string, query: string): number {
  const tv = textValue.toLowerCase();
  const tokens = tv.split(/\s+/);
  if (tokens.includes(query)) {
    return 0;
  }
  if (tv.startsWith(query)) {
    return 1;
  }
  if (tokens.some((token) => token.startsWith(query))) {
    return 2;
  }
  return 3;
}

// The searchable text of an <Option> element: explicit textValue, else its
// string children (matches how react-stately derives an Item's textValue).
function optionText(element: ReactElement): string {
  const props = element.props as { textValue?: string; children?: ReactNode };
  if (typeof props.textValue === 'string') {
    return props.textValue;
  }
  return typeof props.children === 'string' ? props.children : '';
}

// Searchable mode: react-stately `useComboBoxState` + react-aria `useComboBox`,
// with the list rendered in a portaled overlay (see SelectOverlay) so it works
// inside a modal/drawer FocusScope.
//
// We CONTROL `inputValue` (the react-aria "control both" pattern) so its
// commit-on-blur never reverts the text — that's what makes ArrowDown→Tab on an
// empty input commit reliably (otherwise react-aria's blur reads the
// not-yet-propagated controlled `selectedKey` and clears the field). The trick
// that avoids the menu reopening on every programmatic input change: sync the
// text to the selection INSIDE `onSelectionChange` (synchronous with the select,
// while the menu is still open — react-aria's reopen condition needs the menu
// CLOSED, so it never fires), and use an effect for external/mount `selectedKey`
// changes only while UNFOCUSED (reopen needs focus). A blur re-sync resets an
// abandoned partial edit back to the committed selection.
function ComboBoxSelectInner<T extends object>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    label,
    description,
    errorMessage,
    children,
    placeholder,
    isLoading,
    slots,
    popoverOffset,
    className,
    classNames,
    autoComplete,
    menuTrigger,
    selectTextOnFocus = true,
    autoFocusFirstOption = true,
    searchable: _searchable,
    selectionMode = 'single',
    // Selection props live on the discriminated union; read them via a loose
    // accessor (cast below) and map to react-aria's per-mode shape in ariaProps.
    selectedKey,
    defaultSelectedKey,
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
    // Extracted so it lands ONLY on the hidden <select> (the autofill target),
    // never on the combobox text input — otherwise autofill fills the filter text.
    name,
    ...comboProps
  } = props as SelectBaseProps<T> & {
    selectionMode?: 'single' | 'multiple';
    selectedKey?: Key | null;
    defaultSelectedKey?: Key;
    selectedKeys?: Iterable<Key>;
    defaultSelectedKeys?: Iterable<Key>;
    onSelectionChange?: ((key: Key | null) => void) | ((keys: Key[]) => void);
  };

  // Multi-select (searchable combobox only). Single is the default, untouched
  // path; every multi branch below is gated on `isMultiple`.
  const isMultiple = selectionMode === 'multiple';

  // NOTE: isLoading must NOT disable the input here. In a searchable type-ahead
  // (results fetched per keystroke), disabling on each fetch drops input focus and
  // stops the user typing. isLoading only drives the spinner (see render); the
  // field stays interactive while results load.
  const isDisabled = Boolean(comboProps.isDisabled);

  const isFocusedRef = useRef(false);
  // Always-current state snapshot so callbacks defined before `state` exists
  // (onSelectionChange) and deferred callbacks read the live collection.
  const stateRef = useRef<ComboBoxState<T> | null>(null);

  // Control inputValue ourselves unless the consumer already controls it (e.g. a
  // free-text autocomplete passing its own inputValue/onInputChange).
  const consumerControlsInput = comboProps.inputValue !== undefined;
  const [internalInputValue, setInternalInputValue] = useState('');
  const inputValue = consumerControlsInput
    ? comboProps.inputValue
    : internalInputValue;

  // Relevance-rank options while filtering a flat, uncontrolled-input searchable
  // select (e.g. country/region): exact-token and prefix matches sort above
  // mid-word substring hits, so typing "us" puts United States (token "us") and
  // "Usbekistan" (prefix) above "Belarus" (substring). react-aria's filter is
  // keep/drop only — reordering the source children makes the *visible* matches
  // come out ranked, and keyboard nav follows. Skipped when the consumer controls
  // input (owns filtering), uses a render fn, or uses <Section> groups (reordering
  // would break grouping); empty query keeps the original order.
  //
  // Sort the RAW children array — NOT Children.toArray(), which re-keys its output
  // (an `<Option key="us">` comes back as ".$us"). That re-key desyncs the
  // collection's item keys from the controlled selectedKey, so state.selectedItem
  // resolves to null and the blur re-sync clears the committed value. A plain array
  // (the `items.map()` / multiple-static-child case) keeps each element's original
  // key when sorted; anything else (single child, nested/mixed content) is left
  // untouched.
  const rankedChildren = useMemo(() => {
    const query = (inputValue ?? '').trim().toLowerCase();
    if (
      consumerControlsInput ||
      typeof children === 'function' ||
      query === '' ||
      !Array.isArray(children)
    ) {
      return children;
    }
    const childArray = children as ReactNode[];
    const elements = childArray.filter((child): child is ReactElement =>
      isValidElement(child),
    );
    if (
      elements.length !== childArray.length ||
      elements.length === 0 ||
      elements.some((el) => el.type === Section)
    ) {
      return children;
    }
    return [...elements].sort(
      (a, b) =>
        matchRank(optionText(a), query) - matchRank(optionText(b), query),
    );
  }, [children, consumerControlsInput, inputValue]);

  // Multi value/defaultValue must be a stable ARRAY ref — react-aria treats a
  // controlled `value` referentially, so spreading selectedKeys inline every
  // render (`[...selectedKeys]`) makes it look perpetually changed → infinite
  // re-render. Memoize on the consumer's reference.
  const multiValue = useMemo(
    () => (isMultiple && selectedKeys ? [...selectedKeys] : undefined),
    [isMultiple, selectedKeys],
  );
  const multiDefaultValue = useMemo(
    () =>
      isMultiple && defaultSelectedKeys ? [...defaultSelectedKeys] : undefined,
    [isMultiple, defaultSelectedKeys],
  );

  // Selection mapping. Single uses react-aria's selectedKey/onSelectionChange
  // (wrapped to sync the input text). Multiple maps our selectedKeys/
  // onSelectionChange(Key[]) onto react-aria's multi contract (value/onChange) —
  // react-stately's multi-combobox routes through value/onChange, not
  // onSelectionChange — and the input is just a filter (cleared per pick below).
  const selectionAriaProps = isMultiple
    ? {
        selectionMode: 'multiple' as const,
        value: multiValue,
        defaultValue: multiDefaultValue,
        onChange: onSelectionChange as ((keys: Key[]) => void) | undefined,
      }
    : {
        selectedKey,
        defaultSelectedKey,
        onSelectionChange: (key: Key | null) => {
          // Canonical control-both sync: set the text to the selected item HERE,
          // synchronously with the select while the menu is still open, so the
          // reopen-on-input-change path (needs a closed menu) never triggers.
          if (!consumerControlsInput) {
            const item =
              key != null ? stateRef.current?.collection.getItem(key) : null;
            setInternalInputValue(itemDisplayText(item));
          }
          (onSelectionChange as ((key: Key | null) => void) | undefined)?.(key);
        },
      };

  const ariaProps = {
    ...comboProps,
    label,
    children: rankedChildren as never,
    placeholder,
    isDisabled,
    menuTrigger: menuTrigger ?? 'focus',
    autoComplete,
    inputValue,
    ...selectionAriaProps,
    onInputChange: (next: string) => {
      if (!consumerControlsInput) {
        setInternalInputValue(next);
      }
      comboProps.onInputChange?.(next);
      // Control-both: emptying the field must clear the selection — react-aria
      // only does this automatically when inputValue is uncontrolled. Single
      // only — in multi the input is just a filter and clearing it keeps chips.
      if (!isMultiple && next === '' && stateRef.current?.selectedKey != null) {
        stateRef.current.setSelectedKey(null);
      }
    },
  };

  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState<T>({
    ...ariaProps,
    defaultFilter: contains,
    // Keep the menu "open" when filtering to zero matches so react-aria doesn't
    // close + revert the input (which selects the text and eats the next
    // keystroke). We just don't render the empty dropdown (see below), so the
    // user can keep typing freely.
    allowsEmptyCollection: true,
    // Cast: react-aria types the combobox single-only; the hook supports
    // selectionMode 'multiple' (+ value/onChange) at runtime.
  } as Parameters<typeof useComboBoxState<T>>[0]);

  useEffect(() => {
    stateRef.current = state;
  });

  // Multi-select: clear the filter after each pick so the user can keep adding.
  // react-stately's multi-combobox routes through value/onChange (not
  // onSelectionChange), so we detect a pick by the selected count growing.
  const prevSelectedCountRef = useRef(0);
  const selectedCount = state.selectionManager.selectedKeys.size;
  useEffect(() => {
    if (!isMultiple) {
      return;
    }
    if (
      selectedCount > prevSelectedCountRef.current &&
      !consumerControlsInput
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInternalInputValue('');
    }
    prevSelectedCountRef.current = selectedCount;
  }, [isMultiple, selectedCount, consumerControlsInput]);

  // The selected item's text — from state.selectedItem, which reads the ORIGINAL
  // collection (not state.collection, the *displayed* one that's frozen to a
  // stale empty `lastCollection` while the menu has never opened — that left a
  // disabled, pre-selected field like Country blank). Recomputed each render so
  // it also tracks ASYNC option loading (label goes '' → real once data arrives).
  const selectedItemText = itemDisplayText(state.selectedItem);

  // Mirror EXTERNAL/mount selection into the input — covers a pre-selected value,
  // its option arriving from async load, and an external setValue (autocomplete).
  // Only while UNFOCUSED so it can't hit the reopen-while-focused path; user
  // selections sync through onSelectionChange above instead. Single only —
  // multi has no single "selected item" to mirror (chips show the selections).
  useEffect(() => {
    if (
      consumerControlsInput ||
      isMultiple ||
      isFocusedRef.current ||
      internalInputValue === selectedItemText
    ) {
      return;
    }
    // Syncing external/async state (the selected option's label) into the
    // controlled input is the intended use of this effect; the guard above makes
    // it a no-op once in sync, so no cascading renders.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInternalInputValue(selectedItemText);
  }, [selectedItemText, consumerControlsInput, internalInputValue, isMultiple]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useObjectRef(ref);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // The field wrapper (input + arrow) — the anchor the portaled dropdown
  // positions against and matches width to.
  const triggerWrapperRef = useRef<HTMLDivElement>(null);
  // The first-match key WE auto-highlighted, so the highlight effect can re-apply
  // it (react-aria keeps clearing it) without stomping a key the user arrowed to.
  const autoHighlightRef = useRef<Key | null>(null);

  const {
    inputProps,
    listBoxProps,
    labelProps,
    buttonProps: triggerProps,
    descriptionProps,
    errorMessageProps,
  } = useComboBox(
    // Cast: single-only typing vs runtime multi-select support.
    { ...ariaProps, inputRef, listBoxRef, popoverRef, buttonRef } as Parameters<
      typeof useComboBox<T>
    >[0],
    state,
  );

  const { buttonProps } = useButton(triggerProps, buttonRef);

  const isInvalid = state.displayValidation.isInvalid;

  // Capture react-aria's input handlers so we can chain them as direct JSX props
  // (the compiler recognises those as event handlers; routing them through
  // mergeProps trips the "ref during render" rule on our focus/blur closures).
  const {
    onKeyDown: ariaInputKeyDown,
    onFocus: ariaInputFocus,
    onBlur: ariaInputBlur,
    ...inputPropsRest
  } = inputProps;

  // Home/End must move the text cursor. When the listbox is open react-aria
  // chains the collection's key handler, which hijacks Home/End to jump to the
  // first/last option and preventDefaults them. We let Home/End fall through to
  // native cursor movement and delegate everything else.
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Home' || event.key === 'End') {
      return;
    }
    ariaInputKeyDown?.(event as never);
  };

  // Highlight-first while filtering (non-empty input): keep the first match the
  // focused key so Enter/Tab commit it natively (virtual focus → only
  // aria-activedescendant moves, DOM focus stays on the input). This runs every
  // render and SELF-HEALS: react-aria clears the focused key on every input
  // change, and a host form's extra re-renders can clear it again right after we
  // set it (the "highlight flashes then vanishes, Tab grabs the wrong row" bug),
  // so we re-apply whenever the key is empty or still our own auto-highlight.
  // We track the key we set in `autoHighlightRef` so we never stomp a row the
  // user explicitly arrowed to. Skipped on an empty input (plain open) so
  // ArrowDown can navigate from nothing.
  useEffect(() => {
    const manager = state.selectionManager;
    if (
      !autoFocusFirstOption ||
      !state.isOpen ||
      state.inputValue.length === 0
    ) {
      autoHighlightRef.current = null;
      return;
    }
    const focusedKey = manager.focusedKey;
    // The user navigated to a row that isn't the one we auto-set — leave it.
    if (focusedKey != null && focusedKey !== autoHighlightRef.current) {
      return;
    }
    // Read the filtered collection at effect time (a render behind any
    // show-all-items flash). Prefer an exact code/word match over the first
    // substring hit (typing "us" highlights "United States" via its "us" token,
    // not "Belarus"); skip section headers either way.
    const firstKey = highlightKey(state.collection, state.inputValue);
    autoHighlightRef.current = firstKey ?? null;
    if (firstKey != null && firstKey !== focusedKey) {
      manager.setFocusedKey(firstKey);
    }
  });

  // Select-on-focus must fire ONLY on a genuine user focus-in — not on the input
  // regaining focus from internal churn (e.g. the list unmounting at zero
  // matches), which would re-select the text mid-typing and overwrite it.
  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    ariaInputFocus?.(event as never);
    const reentry = isFocusedRef.current;
    isFocusedRef.current = true;
    if (reentry || !selectTextOnFocus) {
      return;
    }
    const input = event.target;
    const valueAtFocus = input.value;
    // Only select an EXISTING value (so "click to type a replacement" works);
    // skip when empty, and no-op if the user already started typing.
    if (!valueAtFocus) {
      return;
    }
    requestAnimationFrame(() => {
      if (input.value === valueAtFocus) {
        input.select();
      }
    });
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    ariaInputBlur?.(event as never);
    // Deferred + guarded: only act once focus genuinely LEFT the input (a
    // same-tick blur→refocus from internal churn lands back on it). Capture the
    // element from the event rather than reading the ref during render.
    const input = event.currentTarget;
    requestAnimationFrame(() => {
      if (document.activeElement === input) {
        return;
      }
      isFocusedRef.current = false;
      // Always close on blur. react-aria's blur-commit leaves the menu open when
      // the input was cleared to empty (allowsEmptyCollection keeps the full list
      // "open" and there's no focused key to commit-and-close). The activeElement
      // guard above means a mouse pick — which keeps DOM focus on the input via
      // virtual focus — never reaches here, so this only fires when focus genuinely
      // left the field. No-op when react-aria already closed.
      stateRef.current?.close();
      // Reset an abandoned partial edit. Single: revert to the committed
      // selection's text. Multi: the input is just a filter, so clear it (chips
      // hold the selections). Deferred + unfocused, so no reopen.
      if (!consumerControlsInput) {
        setInternalInputValue(
          isMultiple ? '' : itemDisplayText(stateRef.current?.selectedItem),
        );
      }
    });
  };

  // react-aria's HiddenSelect (rendered below for autofill) calls `state.setValue`
  // in its hidden <select>'s onChange — a method SelectState has but ComboBoxState
  // does NOT. Browser autofill writing into that <select> would otherwise throw
  // "setValue is not a function". Wrap the combobox state in a Proxy that maps
  // setValue → setSelectedKey, preserving the state's live getters (selectedKey,
  // collection, …) so the hidden mirror reflects the current selection.
  const hiddenSelectState = useMemo(
    () =>
      new Proxy(state, {
        get(target, prop) {
          if (prop === 'setValue') {
            return (key: Key | null) => target.setSelectedKey(key);
          }
          return Reflect.get(target, prop);
        },
      }) as unknown as SelectState<T>,
    [state],
  );

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
      {/*
        Hidden native <select> mirror. A searchable combobox has no native form
        control for its SELECTION, so password managers / browser autofill have
        nothing to fill. react-aria's HiddenSelect renders a real (visually
        hidden) <select> for collections ≤300 — autofill targets it and its
        onChange drives setValue → our selection. ComboBoxState has NO `setValue`,
        so we pass `hiddenSelectState` (a Proxy mapping setValue → setSelectedKey);
        without it, autofill into the hidden <select> throws "setValue is not a
        function".

        triggerRef points at the NON-FOCUSABLE wrapper (not the input): when
        autofill focuses the hidden <select>, HiddenSelect redirects focus to
        triggerRef — redirecting to the input would focus it and pop the menu
        open (the autofill "flash"). A plain <div> can't take focus, so the
        redirect is a no-op, the input never focuses, and neither the focus-open
        nor the input-change-reopen fires. The value still sets via onChange.
      */}
      <HiddenSelect
        state={hiddenSelectState}
        triggerRef={triggerWrapperRef}
        label={label}
        name={name}
        isDisabled={isDisabled}
        autoComplete={autoComplete}
      />
      {/* Multi-select chips with full keyboard a11y (TagGroup). */}
      {isMultiple && (
        <SelectTags
          items={(state.selectedItems ?? []).map((selected) => ({
            id: selected.key,
            label: itemDisplayText(selected),
          }))}
          onRemove={(key) => state.selectionManager.toggleSelection(key)}
          classNames={{
            tagGroup: cn(classNames?.tagGroup),
            tag: cn(classNames?.tag),
            tagRemoveButton: cn(classNames?.tagRemoveButton),
          }}
        />
      )}
      <div
        ref={triggerWrapperRef}
        className={cn(
          'flex',
          'relative',
          'w-full',
          classNames?.comboBoxContainer,
        )}
      >
        <input
          {...inputPropsRest}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            'border border-solid border-slate-300',
            'text-sm text-slate-900',
            'py-0 px-2',
            'h-10 w-full',
            'm-0',
            'rounded-md',
            'bg-white',
            'transition-all ease-in-out duration-200',
            'hover:border-slate-400',
            'focus:border-slate-400 focus:outline focus:outline-2 focus:outline-slate-200',
            'disabled:bg-slate-100 disabled:border-slate-300',
            isLoading ? 'disabled:text-slate-900' : 'disabled:text-slate-500',
            isInvalid &&
              'border-red-500 bg-red-100 text-red-600 placeholder:text-slate-400',
            isInvalid &&
              'hover:border-red-600 focus:border-red-600 focus:outline-red-200',
            classNames?.input,
          )}
        />
        {isLoading ? (
          <div
            className={cn(
              'absolute top-2 right-2',
              'block',
              classNames?.loader,
            )}
          >
            {slots?.loadingIcon || <Pulse />}
          </div>
        ) : (
          <button
            {...buttonProps}
            ref={buttonRef}
            className={cn(
              'absolute top-2 right-0',
              'block',
              'border-none bg-none',
              classNames?.arrowButton,
            )}
          >
            <ChevronIcon
              isOpen={state.isOpen}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              buttonIcon={slots?.buttonIcon}
            />
          </button>
        )}

        {state.isOpen && state.collection.size > 0 && (
          <SelectOverlay
            state={state}
            triggerRef={triggerWrapperRef}
            popoverRef={popoverRef}
            offset={popoverOffset}
            className={cn(classNames?.listContainer)}
          >
            <SelectListBox
              state={state}
              listBoxProps={listBoxProps as AriaListBoxOptions<T>}
              listBoxRef={listBoxRef}
              optionVirtualFocus
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

interface ComboBoxSelectComponent {
  <T extends object>(
    props: SelectProps<T> & { ref?: ForwardedRef<HTMLInputElement> },
  ): JSX.Element;
}

export const ComboBoxSelect = forwardRef(
  ComboBoxSelectInner,
) as ComboBoxSelectComponent;

export default ComboBoxSelect;
