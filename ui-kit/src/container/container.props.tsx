import type { ReactNode } from 'react';
import type { CSSProp } from 'styled-components';
import { Theme } from '../theming/theming';
import { SpacingProps } from '../spacing/spacing.props';

export interface ContainerProps extends SpacingProps {
  children: ReactNode;
  css?: CSSProp;
  theme?: Theme | undefined;
}
