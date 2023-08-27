import type { HTMLAttributes } from 'react';
import type { CSSProp } from 'styled-components';
import { Palette } from '../palette/palette';
import { Theme } from '../theming/theming';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme | undefined;
  css?: CSSProp;

  bg?: Palette;
  color?: Palette;
  disabled?: boolean;
  shape?: 'circle' | 'round' | 'square';
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'pending';
}

export interface BadgeDotProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme | undefined;
  css?: CSSProp;

  color?: Palette;
}
