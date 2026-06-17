# Select standardization — one `<Select searchable>`, `DropdownSelect` removed

**Date:** 2026-06-17
**Affects:** Any app consuming `@clicktap/ui`'s `Select` / `DropdownSelect` (Crispi, FFL, and any fork that renders pickers, sort controls, country/region selects, or configurable-product options).
**Classification:** FEATURE + BREAKING
**Breaking:** Yes — (1) `DropdownSelect` removed, (2) the bare `<Select>` is now a **button picker**, not a combobox, (3) `DropdownSelect`'s `classNames.trigger` is now `classNames.input`, (4) the root is `w-full` by default.

## Dependencies

| Package | Minimum version |
|---|---|
| `@clicktap/ui` | The release bundling this commit. Confirm with `jq '.dependencies["@clicktap/ui"]' apps/frontend/package.json`. |

(Actual version is set by semantic-release when `bugfixes` merges to `master`.)

## Summary

There used to be **two** components: `DropdownSelect` (a native-feel button picker) and `Select` (a react-aria `ComboBox` with a text input). They had different APIs, different `classNames` keys, and overlapping purposes.

They're now **one** component — `<Select>` — with a `searchable` prop:

- `searchable={false}` *(default)* — **button picker**: click to open, pick one. Right for short, fixed lists (sort order, "show per row"). Backed by a real hidden `<select>`, so it autofills.
- `searchable` *(`true`)* — **combobox**: type to filter; the first match highlights, Tab/Enter commit it and Tab advances to the next field. Right for long lists (country, region). The dropdown is **portaled** so it works inside modals/drawers, and it ships with a hidden `<select>` mirror so password managers / browser autofill still work.
- `searchable="auto"` — searchable once there are more than ~8 options.

`<Option>` / `OptionProps` are unchanged (still react-stately's `Item`).

## What changed

| Area | Before | After |
|---|---|---|
| Exports | `DropdownSelect`, `DropdownSelectProps` + `Select` | `Select` only (`DropdownSelect` removed) |
| Bare `<Select>` | Combobox (type-to-filter) | **Button picker** — add `searchable` to keep filtering |
| `DropdownSelect` button class | `classNames.trigger` | `classNames.input` |
| Root width | `DropdownSelect`: auto (`flex items-center`) | `w-full` (form-field default) — override for inline/`justify-end` rows |
| `SelectSlots.listBoxComponent` | Custom listbox renderer | **No-op** — the dropdown is rendered internally now; remove it |
| New props | — | `searchable`, `selectTextOnFocus`, `autoFocusFirstOption`, `name` + `autoComplete` (autofill) |
| Filtering | name only | match by name **or** option `textValue` aliases (codes) |

Find affected usages:

```bash
grep -rn 'DropdownSelect\|classNames=' apps/frontend libs/ui \
  | grep -E 'DropdownSelect|trigger:|listBoxComponent' | head -40
# And every <Select> that relied on type-to-filter:
grep -rn '<Select' apps/frontend | grep -v 'searchable' | head -40
```

## Migration Steps

### 1. `DropdownSelect` → `<Select>` (default button mode)

```tsx
// Before
import { DropdownSelect, Option } from '@clicktap/ui/components/Select';

<DropdownSelect
  selectedKey={key}
  onSelectionChange={onChange}
  classNames={{ trigger: 'text-xs w-44 h-8', value: 'text-xs', label: '...' }}
>
  <Option key="a">A</Option>
</DropdownSelect>

// After — same button look; `trigger` → `input`
import { Select, Option } from '@clicktap/ui/components/Select';

<Select
  selectedKey={key}
  onSelectionChange={onChange}
  classNames={{ input: 'text-xs w-44 h-8', value: 'text-xs', label: '...' }}
>
  <Option key="a">A</Option>
</Select>
```

### 2. Old `<Select>` that filtered → add `searchable`

The bare `<Select>` no longer renders a text input. If you relied on type-to-filter, opt in:

```tsx
// Before — combobox behavior was implicit
<Select selectedKey={key} onSelectionChange={onChange}>{options}</Select>

// After — keep type-to-filter
<Select searchable selectedKey={key} onSelectionChange={onChange}>{options}</Select>
```

For long lists where you're unsure, `searchable="auto"` turns it on past ~8 options.

### 3. Fix inline / right-floated layout (the `w-full` root)

`DropdownSelect`'s root was auto-width; the new `Select` root is `w-full` (correct for form fields, wrong for a toolbar row). In a `justify-end` / `flex items-center` row it now fills the width and sits left. `cn` is `twMerge`, so a `className` width override on the **root** wins:

```tsx
// Before (broke: fills the row, left-aligned)
<div className="flex items-center justify-end">
  <Select classNames={{ input: 'w-44' }} ... />
</div>

// After (floats right again)
<div className="flex items-center justify-end">
  <Select className="w-44" classNames={{ input: 'w-44' }} ... />
</div>
```

> `classNames.input` sizes the button/input; **`className` sizes the root.** Constrain the root anywhere the Select isn't meant to be full-width.

### 4. Remove `slots.listBoxComponent`

The dropdown list is rendered internally now; a custom `listBoxComponent` is ignored. Delete it (style via `classNames.listContainer` / `classNames.list` instead).

### 5. (Optional) Enable autofill on a searchable select

A searchable combobox has no native form control for its *selection*, so password managers / browser autofill can't fill it — **unless** you pass `name` (and ideally an `autoComplete` token). The Select then renders a hidden native `<select>` (for ≤300 options) that autofill targets; its change drives the selection.

```tsx
<Select
  searchable
  name="region"
  autoComplete="address-level1"   // "country" for a country field, etc.
  selectedKey={value ?? null}
  onSelectionChange={onChange}
>
  {regions.map((r) => <Option key={r.code}>{r.name}</Option>)}
</Select>
```

Autofill matches the **option text** (the state/country name), so render the name as the option's children.

### 6. (Optional) Match by code/alias when typing

By default filtering matches the option's `textValue` (its display name). To let users type a **code** ("tx", "us-tx") and still find the row, put the aliases in `textValue` — the field still displays the rendered children, not `textValue`:

```tsx
<Option key={code} textValue={`${name} ${shortCode} ${code}`}>
  {name}
</Option>
```

### Verification

```bash
nx run frontend:typecheck   # no errors referencing DropdownSelect / trigger / listBoxComponent
nx run ui:typecheck
nx run ui:build-storybook
```

Visually confirm, per migrated select:
- [ ] Button selects open/select/close; value shows.
- [ ] Searchable selects: type to filter, Tab/Enter commit, Tab advances; clear + Tab clears.
- [ ] Searchable inside a **modal/drawer**: Tab moves to the next field (dropdown is portaled out of the focus trap).
- [ ] Toolbar/inline selects float/size correctly (root width set).
- [ ] Autofill (if enabled): password manager fills the field; value sticks.

## Rollback

Revert `@clicktap/ui` in the consuming app:

```bash
docker compose exec -u app node-app pnpm --filter <app> add '@clicktap/ui@<previous-minor>'
```

Safe — presentation-layer only, no persistent state.

## References

- Source: `libs/ui/src/components/Select/` (`Select.tsx` dispatches to `ButtonSelect.tsx` / `ComboBoxSelect.tsx`; shared parts in `parts.tsx`)
- Types: `libs/ui/src/components/Select/Select.types.ts`
- Stories: `libs/ui/src/components/Select/Select.stories.tsx` (`Picker`, `Searchable`, `SearchableAuto`)
- In-repo consumer examples: `apps/frontend/components/AddressForm/AddressForm.tsx` (country/region, autofill, aliases), `apps/frontend/components/Collection/CollectionToolbar.tsx` (toolbar width), `apps/frontend/components/Product/components/ConfigurableOptions/ConfigurableOptions.tsx`
- Related: [`Select` `onSelectionChange` widened to `Key | T`](../04/2026-04-17-select-address-input-onchange-key-or-item.md), [`Select` `popoverPortalContainer` restored](../02/2026-02-17-select-popover-portal-container-restored.md)
