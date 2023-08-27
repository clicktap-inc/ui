import type { CSSProp } from 'styled-components';
import type { ReactElement /* ReactNode */ } from 'react';
import type { MiddlewareState, Placement } from '@floating-ui/react';
import { Theme } from '../theming/theming';

type Trigger = 'click' | 'hover' | 'focus';

/** from floating-ui docs https://floating-ui.com/docs/offset */
interface AxesOffsets {
  mainAxis?: number;
  crossAxis?: number;
  alignmentAxis?: number | null;
}
type Options =
  | number
  | AxesOffsets
  | ((state: MiddlewareState) => number | AxesOffsets);

export interface MenuProps {
  closeDelay?: number;
  css?: CSSProp;
  offset?: Options;
  openDelay?: number;
  placement?: Placement;
  slots?: {
    content?: ReactElement;
    contentRoot?: ReactElement;
    submenuRoot?: ReactElement;
    submenu?: ReactElement;
  };
  theme?: Theme | undefined;
  /** @todo can only have 1 of each type of trigger */
  trigger?: Trigger[];
}
