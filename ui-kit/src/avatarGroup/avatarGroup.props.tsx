import type { HTMLAttributes } from 'react';
import type { CSSProp } from 'styled-components';

import { Theme } from '../theming/theming';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;

  direction?: 'horizontal' | 'vertical';
  stackedFrom?: 'top' | 'bottom';
}
