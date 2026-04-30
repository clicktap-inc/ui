import type { VariantLike } from './types';

/**
 * Returns the first variant whose attributes match every selection in
 * `selections`. Axes not present in `selections` (or with empty values)
 * are unconstrained. Each axis matches if the selection equals either the
 * option `code` or `id` — supports callers that key by either.
 */
export function findVariant<V extends VariantLike>(
  variants: V[],
  selections: Record<string, string>,
): V | undefined {
  return variants.find((variant) =>
    (variant.attributes ?? []).every((attr) => {
      const attrCode = attr?.attribute?.code;
      if (!attrCode) {
        return false;
      }
      const selectedValue = selections[attrCode];
      if (!selectedValue) {
        return true;
      }
      return (
        selectedValue === attr?.option?.code ||
        selectedValue === attr?.option?.id
      );
    }),
  );
}
