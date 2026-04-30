import { pruneInvalidSelections } from './pruneInvalidSelections';
import type { VariantLike } from './types';

const variant = (
  attrs: Array<[string, string]>,
): VariantLike => ({
  attributes: attrs.map(([attrCode, optionCode]) => ({
    attribute: { code: attrCode },
    option:    { code: optionCode },
  })),
});

// Three-axis fixture matching the README example shape:
//   red   × small / medium    × cotton (small,cotton; medium,cotton; medium,wool)
//   blue  × small / large     × cotton (small,cotton) / wool (large,wool)
//   green × large              × wool
const variants: VariantLike[] = [
  variant([['color', 'red'],   ['size', 'small'],  ['material', 'cotton']]),
  variant([['color', 'red'],   ['size', 'medium'], ['material', 'cotton']]),
  variant([['color', 'red'],   ['size', 'medium'], ['material', 'wool']]),
  variant([['color', 'blue'],  ['size', 'small'],  ['material', 'cotton']]),
  variant([['color', 'blue'],  ['size', 'large'],  ['material', 'wool']]),
  variant([['color', 'green'], ['size', 'large'],  ['material', 'wool']]),
];

const axes = ['color', 'size', 'material'];

describe('pruneInvalidSelections', () => {
  it('keeps every selection when the combination is a real variant', () => {
    const input = { color: 'red', size: 'medium', material: 'wool' };
    const result = pruneInvalidSelections(variants, input, axes);

    expect(result).toBe(input); // referential equality — nothing dropped
    expect(result).toEqual(input);
  });

  it('keeps a still-reachable downstream selection after upstream change', () => {
    // User had red+small+cotton; switches color to blue.
    // blue+small+cotton is a real variant → keep both downstream picks.
    const input = { color: 'blue', size: 'small', material: 'cotton' };
    const result = pruneInvalidSelections(variants, input, axes);

    expect(result).toEqual({ color: 'blue', size: 'small', material: 'cotton' });
  });

  it('drops the unreachable axis but keeps a downstream value still valid under pruned upstream', () => {
    // User had red+medium+cotton; switches color to blue.
    // blue+medium does NOT exist → size 'medium' invalid for blue → DROP size.
    // material 'cotton' re-evaluates against {color: blue} only (size dropped):
    // blue+small+cotton exists → cotton IS reachable → KEEP material.
    // This is the conservative virtue: only drop what is actually invalid.
    const input = { color: 'blue', size: 'medium', material: 'cotton' };
    const result = pruneInvalidSelections(variants, input, axes);

    expect(result).toEqual({ color: 'blue', material: 'cotton' });
  });

  it('keeps size, drops material when only material is unreachable', () => {
    // blue+large+cotton does NOT exist (blue+large only has wool).
    // Size 'large' is reachable for blue → keep. Material 'cotton' isn't
    // reachable under blue+large → drop.
    const input = { color: 'blue', size: 'large', material: 'cotton' };
    const result = pruneInvalidSelections(variants, input, axes);

    expect(result).toEqual({ color: 'blue', size: 'large' });
  });

  it('drops a top-axis selection that does not exist on any variant', () => {
    // axis-0 reachability is the union across all variants. magenta isn't there
    // → DROP color. size 'small' re-evaluates against {} (no upstream) → every
    // size is reachable → KEEP size.
    const input = { color: 'magenta', size: 'small' };
    const result = pruneInvalidSelections(variants, input, axes);

    expect(result).toEqual({ size: 'small' });
  });

  it('treats axes not in `axes` as untouched', () => {
    const input = { color: 'red', size: 'medium', extraneous: 'whatever' };
    const result = pruneInvalidSelections(variants, input, axes);

    // extraneous axis isn't validated (not in `axes`); preserved as-is.
    expect(result).toEqual(input);
  });

  it('returns the same reference when there is nothing to drop', () => {
    // Every selection is reachable.
    const input  = { color: 'red', size: 'medium' };
    const result = pruneInvalidSelections(variants, input, axes);

    expect(result).toBe(input);
  });

  it('returns a new object only when at least one selection is dropped', () => {
    const input  = { color: 'magenta', size: 'small' };
    const result = pruneInvalidSelections(variants, input, axes);

    expect(result).not.toBe(input); // copy made because color was dropped
    expect(input).toEqual({ color: 'magenta', size: 'small' }); // original untouched
  });

  it('cascades: pruning an upstream axis re-validates everything below it', () => {
    // Picking up an invalid color invalidates size and material under it.
    const input = { color: 'magenta', size: 'medium', material: 'wool' };
    const result = pruneInvalidSelections(variants, input, axes);

    // color drops → size revalidates against {} (no upstream constraint, all sizes
    // reachable) → kept. material revalidates against {size: medium} → wool is
    // reachable in red+medium+wool → kept.
    expect(result).toEqual({ size: 'medium', material: 'wool' });
  });

  it('handles the empty axes list', () => {
    const input  = { color: 'red' };
    const result = pruneInvalidSelections(variants, input, []);

    expect(result).toBe(input);
  });

  it('handles empty selections', () => {
    const result = pruneInvalidSelections(variants, {}, axes);

    expect(result).toEqual({});
  });
});
