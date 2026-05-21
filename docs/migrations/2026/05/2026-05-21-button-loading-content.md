# `ButtonLoadingContent` helper — standardized right-side spinner for all submit buttons

**Date:** 2026-05-21
**Affects:** `@clicktap/ui/components/Button` (new `ButtonLoadingContent` export) and every submit-style button in the frontend app.
**Classification:** IMPROVEMENT
**Breaking:** No

## Dependencies

*None.*

## Summary

A new `ButtonLoadingContent` helper exported from `@clicktap/ui/components/Button` provides the canonical "label + right-side spinner" layout for any submit button. The spinner fades in via opacity (no layout shift), an invisible spacer on the left keeps the label visually centered in both states, and the label stays visible the whole time. This pattern is now used everywhere a submit button needs to show progress — Place Order, Continue (checkout step actions), Sign in / Sign up / Reset password, Save Address, Update / Remove / Add payment method, PDP Add to cart, etc.

Before this change, submit buttons across the app inconsistently mixed:
- text swaps (`isSubmitting ? 'Updating…' : 'Update'`),
- spinner-only (`isSubmitting ? <CircularEasing /> : 'Continue'`),
- inline copy of the Place-Order span/spacer/spinner pattern (`<span className="inline-flex ..."><span className="w-5" /> Place order <span className={isLoading ? 'opacity-100' : 'opacity-0'}>...`),
- nothing at all.

They now all use `ButtonLoadingContent`.

## Why

Two reasons converged:

1. **Inconsistent UX.** Some buttons swapped to "Updating…" text; others showed a spinner instead of the label; some did both; some did neither. There was no single canonical pattern, so visitors got different feedback styles depending on which surface they were on.

2. **A real bug behind the inconsistency.** The Continue-to-review button in checkout was set up to show a loader during step submission, but the Cybersource and Auth.Net `NewCardForm` event handlers were flipping `isSubmitting` back to `false` immediately after dispatching the form-submit event. The label stayed visible (or no loader appeared) during the entire save-card mutation; the loader only reappeared when the state machine reached `submittingStepData`. Standardizing on the helper also forced fixing that — the save-card path now keeps the spinner visible from click through save-card → step-submit.

## Changes

| File | Change |
|---|---|
| `libs/ui/src/components/Button/ButtonLoadingContent.tsx` | **New.** The helper component (see API below). |
| `libs/ui/src/components/Button/index.ts` | Adds `ButtonLoadingContent` to the exports. |
| `apps/frontend/components/Checkout/Step/Payment/Cybersource/NewCardForm.tsx` | Removed the premature `setIsSubmitting(false)` inside the `paymentMethodSubmit` event handler — the spinner now stays visible through the entire save-card + step-submit flow. |
| `apps/frontend/components/Checkout/Step/Payment/Authorizenet/NewCardForm.tsx` | Same fix as Cybersource. |
| `apps/frontend/components/Checkout/Step/StepActions.tsx` | `Continue to review` button: replaced spinner-only-when-loading with `<ButtonLoadingContent>{nextLabel}</ButtonLoadingContent>`. |
| `apps/frontend/components/Checkout/Step/Review/CheckoutButton.tsx` | The three `Place order` buttons (Cybersource / Auth.Net / NO_PAYMENT_REQUIRED) replaced their hand-rolled label+spacer+spinner spans with `<ButtonLoadingContent>`. |
| `apps/frontend/components/Checkout/Step/Review/CheckoutButton/OfflineCheckoutButton.tsx` | Same. |
| `apps/frontend/components/Product/components/AddToCart/AddToCart.tsx` | PDP Add-to-cart now wraps its label in `ButtonLoadingContent` with `isLoading={isUpdatingItems}`. |
| `apps/frontend/components/Checkout/Step/Payment/Cybersource/SavedCardsForm/SavedCard/EditButton/UpdatePayment.tsx`, `.../Authorizenet/...UpdatePayment.tsx`, `.../Account/PaymentMethods/Cybersource/PaymentMethod/EditButton/UpdatePayment.tsx`, `.../Authorizenet/...UpdatePayment.tsx` | `isSubmitting ? 'Updating…' : 'Update'` → `<ButtonLoadingContent isLoading={isSubmitting}>Update</ButtonLoadingContent>`. |
| `apps/frontend/components/Checkout/Step/Payment/Cybersource/SavedCardsForm/SavedCard/DeleteButton.tsx`, `.../Authorizenet/.../DeleteButton.tsx` | `isRemoving ? 'Removing…' : 'Remove'` → `<ButtonLoadingContent isLoading={isRemoving}>Remove</ButtonLoadingContent>`. |
| `apps/frontend/components/Account/PaymentMethods/Cybersource/CreateNewPayment.tsx`, `.../Authorizenet/CreateNewPayment.tsx` | `isSubmitting ? 'Adding payment method' : 'Add payment method'` → `<ButtonLoadingContent>`. |
| `apps/frontend/components/Account/Address/Create.tsx` | `isSubmitting ? <>Saving Address <CircularEasing/></> : 'Save Address'` → `<ButtonLoadingContent isLoading={isSubmitting}>Save Address</ButtonLoadingContent>`. |
| `apps/frontend/components/Account/Address/Edit.tsx` | `isSubmitting ? 'Updating' : 'Update'` → `<ButtonLoadingContent>`. |
| `apps/frontend/components/Account/Auth/Authenticate/Signup.tsx` | `isSubmitting ? 'Signing up' : 'Sign up'` → `<ButtonLoadingContent>`. |
| `apps/frontend/components/Account/Auth/Authenticate/Signin.tsx` | `isSubmitting || isSubmitted ? 'Signing in' : 'Sign in'` → `<ButtonLoadingContent isLoading={isSubmitting || isSubmitted}>Sign in</ButtonLoadingContent>`. |
| `apps/frontend/components/Account/Auth/Authenticate/ResetPassword.tsx` | `isSubmitting ? 'Resetting password' : 'Reset password'` → `<ButtonLoadingContent>`. |

## API

```ts
// @clicktap/ui/components/Button
export function ButtonLoadingContent({
  isLoading?: boolean,        // default false
  spinnerStroke?: string,     // default '#FFFFFF' (suits solid dark buttons)
  children: ReactNode,        // the button's label
}): JSX.Element;
```

Renders (semantically):

```tsx
<span className="inline-flex items-center gap-2">
  <span className="w-5" aria-hidden="true" />     {/* invisible spacer */}
  {children}                                       {/* the label */}
  <span className={isLoading ? 'opacity-100' : 'opacity-0'}>
    <CircularEasing stroke={spinnerStroke} width={20} />
  </span>
</span>
```

The spacer matches the spinner's 20px width — the label stays visually centered whether the spinner is visible or not. The spinner fades via opacity, so the layout doesn't shift when `isLoading` flips.

## Usage

```tsx
import {
  Button,
  ButtonLoadingContent,
} from '@clicktap/ui/components/Button';

<Button
  type="submit"
  isLoading={isSubmitting}
  isDisabled={isSubmitting}
>
  <ButtonLoadingContent isLoading={isSubmitting}>
    Save Address
  </ButtonLoadingContent>
</Button>
```

For outline / ghost buttons (dark text, light background), pass `spinnerStroke`:

```tsx
<Button variant="outline">
  <ButtonLoadingContent isLoading={isSubmitting} spinnerStroke="#0f172a">
    Cancel
  </ButtonLoadingContent>
</Button>
```

## The NewCardForm `setIsSubmitting(false)` bug

A separate but related fix in the same PR: the Cybersource and Auth.Net `NewCardForm` `paymentMethodSubmit` event handlers were doing this:

```ts
// before
const handleCustomEvent = (event: Event) => {
  if (detail?.code === paymentMethodCardCode) {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
    setIsSubmitting(false);  // ← bug: kills the loader before the async work even starts
  }
};
```

After dispatching the form submit, the handler flipped `isSubmitting` to false synchronously. The form's `onSubmit` then began the async save-card mutation + step submission, but the Continue-to-review button no longer showed a loader. The loader only reappeared when the checkout state machine reached `submittingStepData` (after the save-card mutation completed).

```ts
// after
const handleCustomEvent = (event: Event) => {
  if (detail?.code === paymentMethodCardCode) {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
    // Do NOT flip isSubmitting back to false here — the save-card
    // mutation + step submission both run after this dispatch and
    // we want the Continue button's spinner to stay visible the
    // whole time. The error paths in onSubmit and the state
    // machine's submittingStepData transition own the reset-to-false.
  }
};
```

Apply this same change to your local `NewCardForm` for both gateways if your project pulled the earlier version.

## Migration Steps

1. **Update `@clicktap/ui`** to the version that exports `ButtonLoadingContent`.

2. **Find your existing inconsistent submit-button patterns.** Quick search commands:

   ```bash
   # text-swap pattern
   grep -rnE "isSubmitting \\? ['\"]" apps/ libs/ | grep -v vendor | grep -v node_modules
   grep -rnE "isRemoving \\? ['\"]" apps/ libs/ | grep -v vendor | grep -v node_modules
   grep -rnE "isLoading \\? ['\"]" apps/ libs/ | grep -v vendor | grep -v node_modules

   # spinner-only pattern in Buttons
   grep -rnE "isSubmitting \\? <CircularEasing" apps/ libs/ | grep -v vendor

   # hand-rolled Place-Order-style pattern
   grep -rn "inline-flex items-center gap-2" apps/ | grep -B1 -A4 "CircularEasing"
   ```

3. **Rewrite each to use `ButtonLoadingContent`.** Three common transforms:

   ```tsx
   // text-swap → helper
   // before
   <Button isLoading={isSubmitting}>
     {isSubmitting ? 'Updating…' : 'Update'}
   </Button>
   // after
   <Button isLoading={isSubmitting}>
     <ButtonLoadingContent isLoading={isSubmitting}>
       Update
     </ButtonLoadingContent>
   </Button>
   ```

   ```tsx
   // spinner-only → helper (the label stays visible now)
   // before
   <Button>
     {isSubmitting ? <CircularEasing stroke="#FFFFFF" width={24} /> : nextLabel}
   </Button>
   // after
   <Button>
     <ButtonLoadingContent isLoading={isSubmitting}>
       {nextLabel}
     </ButtonLoadingContent>
   </Button>
   ```

   ```tsx
   // hand-rolled span pattern → helper (DRY)
   // before
   <Button>
     <span className="inline-flex items-center gap-2">
       <span className="w-5" aria-hidden="true" />
       Place order
       <span className={isSubmitting ? 'opacity-100' : 'opacity-0'}>
         <CircularEasing stroke="#FFFFFF" width={20} />
       </span>
     </span>
   </Button>
   // after
   <Button>
     <ButtonLoadingContent isLoading={isSubmitting}>
       Place order
     </ButtonLoadingContent>
   </Button>
   ```

4. **If your checkout uses the Cybersource or Auth.Net `NewCardForm` pattern**, remove the premature `setIsSubmitting(false)` in the `paymentMethodSubmit` event handler (see "The NewCardForm `setIsSubmitting(false)` bug" above). The save-card mutation + step-submit path own the lifecycle now.

5. **Verify.**
   - Click Place order on the review step: spinner appears on the right of "Place order", label stays put, no layout shift.
   - Click Continue to review on the checkout payment step with an unsaved card: spinner appears immediately and stays visible through both the save-card mutation and the step submission, with no flash of label-only state in between.
   - Click Update / Remove on any saved-card modal: spinner on the right, label stays.
   - Sign in / Sign up / Reset password: same pattern, no "Signing in…" text variants.

## Pattern for Consumers

The right-side spinner with persistent label is now the canonical submit-feedback pattern across the whole frontend. When adding a new submit button:

```tsx
<Button
  type="submit"
  isLoading={isSubmitting}
  isDisabled={isSubmitting}
>
  <ButtonLoadingContent isLoading={isSubmitting}>
    {/* the static label */}
  </ButtonLoadingContent>
</Button>
```

Don't reach for text-swap variants (`'Saving...'`, `'Updating...'`, `'Signing in'`) — they look inconsistent with the rest of the site and force the visitor to re-read the button. Don't reach for spinner-only-when-loading — same problem in reverse.

For non-submit buttons that just need a spinner overlay (e.g., a loading state on a non-action element), `CircularEasing` is still exported directly and is the right primitive.

## Files Changed

```
libs/ui/src/components/Button/ButtonLoadingContent.tsx          (new)
libs/ui/src/components/Button/index.ts

apps/frontend/components/Checkout/Step/Payment/Cybersource/NewCardForm.tsx
apps/frontend/components/Checkout/Step/Payment/Authorizenet/NewCardForm.tsx
apps/frontend/components/Checkout/Step/StepActions.tsx
apps/frontend/components/Checkout/Step/Review/CheckoutButton.tsx
apps/frontend/components/Checkout/Step/Review/CheckoutButton/OfflineCheckoutButton.tsx
apps/frontend/components/Product/components/AddToCart/AddToCart.tsx
apps/frontend/components/Checkout/Step/Payment/Cybersource/SavedCardsForm/SavedCard/DeleteButton.tsx
apps/frontend/components/Checkout/Step/Payment/Cybersource/SavedCardsForm/SavedCard/EditButton/UpdatePayment.tsx
apps/frontend/components/Checkout/Step/Payment/Authorizenet/SavedCardsForm/SavedCard/DeleteButton.tsx
apps/frontend/components/Checkout/Step/Payment/Authorizenet/SavedCardsForm/SavedCard/EditButton/UpdatePayment.tsx
apps/frontend/components/Account/PaymentMethods/Cybersource/PaymentMethod/EditButton/UpdatePayment.tsx
apps/frontend/components/Account/PaymentMethods/Authorizenet/PaymentMethod/EditButton/UpdatePayment.tsx
apps/frontend/components/Account/PaymentMethods/Cybersource/CreateNewPayment.tsx
apps/frontend/components/Account/PaymentMethods/Authorizenet/CreateNewPayment.tsx
apps/frontend/components/Account/Address/Create.tsx
apps/frontend/components/Account/Address/Edit.tsx
apps/frontend/components/Account/Auth/Authenticate/Signup.tsx
apps/frontend/components/Account/Auth/Authenticate/Signin.tsx
apps/frontend/components/Account/Auth/Authenticate/ResetPassword.tsx
```
