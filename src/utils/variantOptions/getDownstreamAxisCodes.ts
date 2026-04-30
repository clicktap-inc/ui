/**
 * Returns the axis codes that follow `axisCode` in `axes` (i.e. its
 * downstream). Useful when an upstream axis selection changes — the caller
 * typically clears these downstream selections so they don't carry over an
 * incompatible value into the new upstream scope.
 *
 * Returns an empty array if `axisCode` isn't in `axes` (defensive — caller
 * may pass a code that isn't a configurable axis), or if it's the last axis.
 */
export function getDownstreamAxisCodes(
  axes: string[],
  axisCode: string,
): string[] {
  const idx = axes.indexOf(axisCode);
  if (idx < 0) {
    return [];
  }
  return axes.slice(idx + 1);
}
