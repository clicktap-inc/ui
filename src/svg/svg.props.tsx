import type { SVGAttributes, ReactNode } from 'react';
import type { CSSProp } from 'styled-components';

import { Palette } from '../palette/palette';
import { Theme } from '../theming/theming';

export interface SvgProps extends SVGAttributes<SVGSVGElement> {
  children?: ReactNode;
  css?: CSSProp;
  theme?: Theme | undefined;

  fill?: Palette | 'none';
  stroke?: Palette | 'none';
  strokeWidth?: 0 | 1 | 2;
}
