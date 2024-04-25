import type { ReactNode } from 'react';
import type { CSSProp } from 'styled-components';
import { Theme } from '@clicktap/ui-kit';

export interface ContainerProps {
  children: ReactNode;
  css?: CSSProp;
  theme?: Theme | undefined;
}
