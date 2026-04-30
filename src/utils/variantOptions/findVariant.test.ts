import { findVariant } from './findVariant';
import type { VariantLike } from './types';

const variants: VariantLike[] = [
  {
    attributes: [
      { attribute: { code: 'color' }, option: { code: 'red',  id: '1' } },
      { attribute: { code: 'size' },  option: { code: 'small', id: '10' } },
    ],
  },
  {
    attributes: [
      { attribute: { code: 'color' }, option: { code: 'red',  id: '1' } },
      { attribute: { code: 'size' },  option: { code: 'medium', id: '11' } },
    ],
  },
  {
    attributes: [
      { attribute: { code: 'color' }, option: { code: 'blue', id: '2' } },
      { attribute: { code: 'size' },  option: { code: 'large', id: '12' } },
    ],
  },
];

describe('findVariant', () => {
  it('finds the first variant matching all selections', () => {
    expect(findVariant(variants, { color: 'red', size: 'medium' })).toBe(variants[1]);
    expect(findVariant(variants, { color: 'blue', size: 'large' })).toBe(variants[2]);
  });

  it('treats missing or empty selections as unconstrained', () => {
    expect(findVariant(variants, { color: 'red' })).toBe(variants[0]);
    expect(findVariant(variants, { size: 'large' })).toBe(variants[2]);
    expect(findVariant(variants, {})).toBe(variants[0]);
    expect(findVariant(variants, { color: '' })).toBe(variants[0]);
  });

  it('matches by option id as well as code', () => {
    expect(findVariant(variants, { color: '2', size: '12' })).toBe(variants[2]);
    expect(findVariant(variants, { color: '1', size: 'small' })).toBe(variants[0]);
  });

  it('returns undefined when no variant matches', () => {
    expect(findVariant(variants, { color: 'red', size: 'large' })).toBeUndefined();
    expect(findVariant(variants, { color: 'magenta' })).toBeUndefined();
  });
});
