import type { ReactNode } from 'react';
import type { CSSProp } from 'styled-components';
import { EffectsProps } from '../effects/effects.props';
import { Theme } from '../theming/theming';
import { SpacingProps } from '../spacing/spacing.props';
import { TypographyProps } from '../typography/typography.props';

export interface GridProps extends SpacingProps, EffectsProps, TypographyProps {
  children?: ReactNode;
  css?: CSSProp;
  theme?: Theme | undefined;

  // grid properties
  alignContent?: string;
  alignItems?: string;
  autoCols?: string;
  autoFlow?: string;
  autoRows?: string;
  cols?: string | number;
  display?: string;
  gap?: string | number;
  gapx?: string | number; // columnGap
  gapy?: string | number; // rowGap
  grid?: string;
  justifyContent?: string;
  justifyItems?: string;
  placeContent?: string;
  placeItems?: string;
  rows?: string | number;
  template?: string;
  templateAreas?: string;
  templateCols?: string;
  templateRows?: string;

  // grid item properties - must be here for nested grid boxes
  alignSelf?: string;
  area?: string;
  colEnd?: string | number;
  colSpan?: string | number;
  colStart?: string | number;
  justifySelf?: string;
  placeSelf?: string;
  rowEnd?: string | number;
  rowSpan?: string | number;
  rowStart?: string | number;
}

/** @todo do we even need a grid item? */
export interface GridItemProps
  extends SpacingProps,
    EffectsProps,
    TypographyProps {
  children?: ReactNode;
  css?: CSSProp;
  theme?: Theme | undefined;

  // grid item properties
  alignSelf?: string;
  area?: string;
  colEnd?: string | number;
  colSpan?: string | number;
  colStart?: string | number;
  justifySelf?: string;
  placeSelf?: string;
  rowEnd?: string | number;
  rowSpan?: string | number;
  rowStart?: string | number;
}
