import { filterAvailableOptions } from './filterAvailableOptions';
import type { VariantLike } from './types';

const variant = (
  attrs: Array<[string, string]>,
): VariantLike => ({
  attributes: attrs.map(([attrCode, optionCode]) => ({
    attribute: { code: attrCode },
    option:    { code: optionCode },
  })),
});

// Three-axis fixture: color, size, material.
// Variants intentionally don't form a Cartesian product so each axis has
// distinct upstream-conditional reachability.
const variants: VariantLike[] = [
  variant([['color', 'red'],   ['size', 'small'],  ['material', 'cotton']]),
  variant([['color', 'red'],   ['size', 'medium'], ['material', 'cotton']]),
  variant([['color', 'red'],   ['size', 'medium'], ['material', 'wool']]),
  variant([['color', 'blue'],  ['size', 'small'],  ['material', 'cotton']]),
  variant([['color', 'blue'],  ['size', 'large'],  ['material', 'wool']]),
  variant([['color', 'green'], ['size', 'large'],  ['material', 'wool']]),
];

const axes = ['color', 'size', 'material'];

describe('filterAvailableOptions (top-down)', () => {
  it('returns every option for the first axis regardless of selections', () => {
    expect(
      filterAvailableOptions(variants, {}, axes, 'color'),
    ).toEqual(new Set(['red', 'blue', 'green']));

    // Even if a downstream axis is selected, the first axis stays open —
    // top-down means downstream selections do not constrain upstream.
    expect(
      filterAvailableOptions(variants, { size: 'large' }, axes, 'color'),
    ).toEqual(new Set(['red', 'blue', 'green']));

    expect(
      filterAvailableOptions(
        variants,
        { material: 'cotton' },
        axes,
        'color',
      ),
    ).toEqual(new Set(['red', 'blue', 'green']));
  });

  it('filters the second axis by the first axis selection only', () => {
    expect(
      filterAvailableOptions(variants, { color: 'red' }, axes, 'size'),
    ).toEqual(new Set(['small', 'medium']));

    expect(
      filterAvailableOptions(variants, { color: 'blue' }, axes, 'size'),
    ).toEqual(new Set(['small', 'large']));

    // A downstream selection (material) doesn't restrict size — only color
    // does, since color is the only upstream axis.
    expect(
      filterAvailableOptions(
        variants,
        { color: 'red', material: 'wool' },
        axes,
        'size',
      ),
    ).toEqual(new Set(['small', 'medium']));
  });

  it('filters the third axis by both upstream selections', () => {
    expect(
      filterAvailableOptions(
        variants,
        { color: 'red', size: 'medium' },
        axes,
        'material',
      ),
    ).toEqual(new Set(['cotton', 'wool']));

    expect(
      filterAvailableOptions(
        variants,
        { color: 'red', size: 'small' },
        axes,
        'material',
      ),
    ).toEqual(new Set(['cotton']));

    expect(
      filterAvailableOptions(
        variants,
        { color: 'blue', size: 'small' },
        axes,
        'material',
      ),
    ).toEqual(new Set(['cotton']));
  });

  it('returns the union across all matching variants when an upstream axis is unselected', () => {
    // No color selected → size is unconstrained; material is constrained
    // only by size (the one upstream axis with a selection).
    expect(
      filterAvailableOptions(
        variants,
        { size: 'medium' },
        axes,
        'material',
      ),
    ).toEqual(new Set(['cotton', 'wool']));

    expect(
      filterAvailableOptions(
        variants,
        { size: 'large' },
        axes,
        'material',
      ),
    ).toEqual(new Set(['wool']));
  });

  it('treats axisCode not in axes as fully open (no upstream constraint)', () => {
    // 'unknown' isn't in the axes order — defensive fallback returns every
    // unique option-on-this-axis across variants.
    expect(
      filterAvailableOptions(variants, {}, axes, 'unknown'),
    ).toEqual(new Set());

    // Sanity: every axis returns its full unique-set when selections are
    // empty AND the axis has no upstream.
    expect(
      filterAvailableOptions(variants, {}, axes, 'size'),
    ).toEqual(new Set(['small', 'medium', 'large']));
  });

  it('ignores empty-string selections on upstream axes', () => {
    expect(
      filterAvailableOptions(variants, { color: '' }, axes, 'size'),
    ).toEqual(new Set(['small', 'medium', 'large']));
  });

  it('skips variants with malformed attribute entries', () => {
    const malformed: VariantLike[] = [
      ...variants,
      // attribute entry missing option code — must not throw, just skip.
      {
        attributes: [
          { attribute: { code: 'color' }, option: { code: 'red' } },
          { attribute: { code: 'size' }, option: { code: '' } },
        ],
      },
    ];

    expect(
      filterAvailableOptions(malformed, { color: 'red' }, axes, 'size'),
    ).toEqual(new Set(['small', 'medium']));
  });
});
