import { defaultTheme } from '../theming/theming';
import type { Theme } from '../theming/theming';

type FilterConditionally<Source, Condition> = Pick<
  Source,
  { [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>;

type SimplePaletteKeys = keyof FilterConditionally<
  typeof defaultTheme['colors'],
  string
>;

type Shades = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type ExtendablePaletteKeys = keyof Omit<
  typeof defaultTheme['colors'],
  SimplePaletteKeys
>;

type ExtendedPaletteKeys = `${ExtendablePaletteKeys}-${Shades}`;

export type Palette = SimplePaletteKeys | ExtendedPaletteKeys;

export const palette = (theme: Theme, paletteKey: Palette) => {
  const paletteKeyChunks = paletteKey.split('-');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (paletteKeyChunks.length < 2) {
    const [simplePaletteKey] = paletteKeyChunks as [SimplePaletteKeys];

    return theme?.colors?.[simplePaletteKey];
  }

  const [extendablePaletteKey, shade] = paletteKeyChunks as [
    ExtendablePaletteKeys,
    Shades
  ];

  return theme?.colors?.[extendablePaletteKey]?.[shade];
};

export default palette;
