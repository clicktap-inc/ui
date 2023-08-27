import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { CSSProp } from 'styled-components';

import { Theme } from '../theming/theming';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;
  variant?: 'circular' | 'rounded' | 'square';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  width?: string | number;
  height?: string | number;
  icon?: ReactNode;
  state?: 'idle' | 'loading';
  text?: string;
  fallback?: ReactElement;
  image?: ReactElement;
  overlay?: ReactNode;
  overlayX?: 'left' | 'center' | 'right';
  overlayY?: 'top' | 'center' | 'bottom';
}
