import type { VariantLike } from './types';

/**
 * Returns the set of option codes selectable for `axisCode`, given the
 * caller's current `selections`.
 *
 * **Top-down dependency**: an axis is filtered ONLY by selections on axes
 * that appear BEFORE it in `axes`. The first axis is always fully reachable
 * across all variants; selections downstream do not constrain it. This
 * matches the typical PDP UX where upper picks (Color → Size → Material)
 * narrow lower picks but never the other way around.
 *
 * @param variants    The configurable product's child variants.
 * @param selections  Map of attribute code → selected option code. Keys for
 *                    axes not in `axes` are ignored.
 * @param axes        Ordered axis attribute codes, upstream → downstream.
 *                    Order is the contract — the caller decides it (usually
 *                    via `sortPriority` or a similar field on the attribute).
 * @param axisCode    Which axis to compute reachable options for. If not in
 *                    `axes`, no upstream selections constrain the result.
 */
export function filterAvailableOptions<V extends VariantLike>(
  variants: V[],
  selections: Record<string, string>,
  axes: string[],
  axisCode: string,
): Set<string> {
  const axisIndex = axes.indexOf(axisCode);

  // Build the upstream-only filter set. axisIndex < 0 means the axis is
  // unknown to the order — treat as fully open. axisIndex === 0 means it's
  // the first axis — also fully open.
  const upstream: Record<string, string> = {};
  if (axisIndex > 0) {
    for (let i = 0; i < axisIndex; i++) {
      const upCode = axes[i];
      const sel    = selections[upCode];
      if (sel) {
        upstream[upCode] = sel;
      }
    }
  }

  const available = new Set<string>();
  for (const variant of variants) {
    let matches: boolean        = true;
    let targetValue: string | null = null;

    for (const attr of variant.attributes ?? []) {
      const code       = attr?.attribute?.code;
      const optionCode = attr?.option?.code;
      if (!code || !optionCode) {
        continue;
      }

      if (code === axisCode) {
        targetValue = optionCode;
        continue;
      }

      const upstreamSel = upstream[code];
      if (upstreamSel && upstreamSel !== optionCode) {
        matches = false;
        break;
      }
    }

    if (matches && targetValue !== null) {
      available.add(targetValue);
    }
  }

  return available;
}
