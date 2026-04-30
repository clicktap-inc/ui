import { filterAvailableOptions } from './filterAvailableOptions';
import type { VariantLike } from './types';

/**
 * Walks `selections` top-to-bottom along `axes` and drops any whose value
 * is no longer reachable under the (possibly already-pruned) upstream
 * context. Preserves user intent: a downstream selection is only cleared
 * when it has actually become invalid, not whenever an upstream changes.
 *
 * Validates the entire selection map, not just downstream of one axis —
 * works for both:
 *
 * - **Selection mutation**: caller composes `{ ...prev, [changedAxis]: newValue }`
 *   then calls this to drop downstream selections that no longer fit.
 * - **URL/state rehydration**: caller passes selections loaded from a stale
 *   source; the prune drops any that don't match the current variant set.
 *
 * Returns the same object reference when nothing was dropped, so callers
 * can use `===` to skip downstream state updates.
 *
 * @param variants    The configurable product's child variants.
 * @param selections  Map of attribute code → selected option code.
 * @param axes        Ordered axis attribute codes, upstream → downstream.
 *                    Must match the order used when computing reachability
 *                    (top-down dependency: axis i is filtered by axes 0..i-1).
 */
export function pruneInvalidSelections<V extends VariantLike>(
  variants: V[],
  selections: Record<string, string>,
  axes: string[],
): Record<string, string> {
  let result = selections;

  for (const axis of axes) {
    const value = result[axis];
    if (!value) {
      continue;
    }

    // Reachable set is computed from upstream selections only (axes before
    // `axis` in `axes`). Top-to-bottom iteration guarantees those upstream
    // values in `result` have already been validated this pass.
    const reachable = filterAvailableOptions(variants, result, axes, axis);
    if (!reachable.has(value)) {
      if (result === selections) {
        result = { ...selections };
      }
      delete result[axis];
    }
  }

  return result;
}
