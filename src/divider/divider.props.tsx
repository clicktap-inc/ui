import { HTMLAttributes, ReactNode } from 'react';
import { CSSProp } from 'styled-components';
import { Palette } from '../palette/palette';
import { Theme } from '../theming/theming';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;

  color?: Palette;
  overlay?: ReactNode;
  overlayX?: 'left' | 'center' | 'right';
}
