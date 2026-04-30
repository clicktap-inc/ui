import { getDownstreamAxisCodes } from './getDownstreamAxisCodes';

describe('getDownstreamAxisCodes', () => {
  const axes = ['color', 'size', 'material'];

  it('returns axes after the given axis', () => {
    expect(getDownstreamAxisCodes(axes, 'color')).toEqual(['size', 'material']);
    expect(getDownstreamAxisCodes(axes, 'size')).toEqual(['material']);
  });

  it('returns an empty array for the last axis', () => {
    expect(getDownstreamAxisCodes(axes, 'material')).toEqual([]);
  });

  it('returns an empty array for an unknown axis', () => {
    expect(getDownstreamAxisCodes(axes, 'unknown')).toEqual([]);
  });

  it('returns an empty array for an empty axes list', () => {
    expect(getDownstreamAxisCodes([], 'color')).toEqual([]);
  });
});
