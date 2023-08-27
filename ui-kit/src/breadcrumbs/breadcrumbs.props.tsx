import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import type { CSSProp } from 'styled-components';

import { Theme } from '../theming/theming';

export interface BreadcrumbsProps
  extends HTMLAttributes<HTMLOListElement>,
    PropsWithChildren {
  css?: CSSProp;
  theme?: Theme | undefined;

  separator?: ReactNode;
}

export interface BreadcrumbsItemProps extends PropsWithChildren {
  current?: boolean;
}
