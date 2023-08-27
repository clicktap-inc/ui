import type { ReactNode } from 'react';
import type { CSSProp } from 'styled-components';
import { EffectsProps } from '../effects/effects.props';
import { Theme } from '../theming/theming';
import { SpacingProps } from '../spacing/spacing.props';
import { TypographyProps } from '../typography/typography.props';

export interface FlexProps extends SpacingProps, EffectsProps, TypographyProps {
  children?: ReactNode;
  css?: CSSProp;
  theme?: Theme | undefined;

  // flex properties
  alignContent?: string;
  alignItems?: string;
  direction?: string;
  display?: string;
  flow?: string;
  gap?: string | number;
  gapx?: string | number; // columnGap
  gapy?: string | number; // rowGap
  justifyContent?: string;
  wrap?: string;

  // flex item properties - must be here for nested flex boxes
  alignSelf?: string;
  basis?: string;
  flex?: string;
  grow?: string | number;
  order?: string | number;
  shrink?: string | number;
}

/** @todo do we even need a flex item? */
export interface FlexItemProps
  extends SpacingProps,
    EffectsProps,
    TypographyProps {
  children?: ReactNode;
  css?: CSSProp;
  theme?: Theme | undefined;

  // flex item properties
  alignSelf?: string;
  basis?: string;
  flex?: string;
  grow?: string | number;
  order?: string | number;
  shrink?: string | number;
}
