import type { ReactNode, HTMLAttributes } from 'react';
import type { CSSProp } from 'styled-components';

import { Palette } from '../palette/palette';
import { Theme } from '../theming/theming';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;

  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  avatar?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  media?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;

  background?: Palette;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;

  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  avatar?: ReactNode;
  actions?: ReactNode;
  background?: Palette;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;

  background?: Palette;
}

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  css?: CSSProp;
  theme?: Theme | undefined;

  aspectRatio?: number;
  background?: Palette;
}
