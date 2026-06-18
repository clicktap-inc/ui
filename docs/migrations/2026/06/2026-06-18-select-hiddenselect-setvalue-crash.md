# `Select` (searchable): fix "setValue is not a function" crash on browser autofill

**Date:** 2026-06-18
**Affects:** `@clicktap/ui` `Select` — the **searchable** (ComboBox) variant (`ComboBoxSelect`)
**Classification:** BUGFIX
**Breaking:** No

## Why

A **searchable** `<Select>` with a `name` (for autofill) crashed on **browser autofill** with:

```
TypeError: setValue is not a function
  at @react-aria/select .../HiddenSelect.mjs  (its <select> onChange calls state.setValue)
```

`ComboBoxSelect` renders react-aria's `HiddenSelect` (a select-only helper) so password
managers / browser autofill have a native control to fill, and passed it the **combobox** state:

```ts
<HiddenSelect state={state as unknown as SelectState<T>} … />
```

That cast is a lie at runtime: `HiddenSelect`'s `<select> onChange` calls `state.setValue`, which
exists on **SelectState** (`useSelectState`, the non-searchable `ButtonSelect`) but **not** on
**ComboBoxState** (`useComboBoxState`). So when autofill wrote into the hidden `<select>`, its change
handler threw. Manual entry didn't trigger it; autofilling an address/country/region/profile form
did. (`ButtonSelect` never crashed — it has a real `SelectState`.)

This was **not** dep-fixable — it reproduced on the latest `@clicktap/ui` + `react-aria`.

## The fix

Wrap the combobox state in a `Proxy` that supplies `setValue` (mapped to `setSelectedKey`) while
preserving the state's live getters (`selectedKey`, `collection`, …), and pass *that* to
`HiddenSelect`:

```ts
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
// …
<HiddenSelect state={hiddenSelectState} … />
```

A `Proxy` (not a spread) is used so the combobox state's getters keep reflecting the current
selection. The hidden native `<select>` mirror — and thus autofill support — is retained; only the
crash is removed.

## Consumer action

If you applied an **interim workaround** while this was unfixed, you can remove it once on a build
with this fix (the next `@clicktap/ui` release, **> 0.40.1**):

- `searchable={false}` forced onto autofill-prone form selects (it routed to `ButtonSelect`/`SelectState` to dodge the crash, at the cost of type-to-filter) — restore `searchable`.
- a `pnpm patch @clicktap/ui` carrying the `setValue → setSelectedKey` shim — drop the patch.

No API change; searchable `Select`s with a `name` now survive autofill.

## Notes

- Dropping `name` does **not** avoid it — react-aria renders `HiddenSelect` regardless, so autofill
  still reaches it.
- A larger future option is to drop `HiddenSelect` for the combobox entirely and use react-aria's
  combobox form-value path (a hidden text input). The Proxy shim is the contained fix and keeps the
  existing `<select>`-based autofill behavior.
