import { Variant } from 'framer-motion';
import type { ReactElement } from 'react';
import type {
  MiddlewareState,
  Placement,
  FloatingArrowProps,
  UseRoleProps,
  UseFloatingOptions,
} from '@floating-ui/react';

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
  offset?: Options;
  openDelay?: number;
  placement?: Placement;
  slots?: {
    content?: ReactElement;
    contentRoot?: ReactElement;
    submenuRoot?: ReactElement;
    submenu?: ReactElement;
  };
  trigger?: Trigger[];
  withArrow?: boolean;
  arrow?: Omit<FloatingArrowProps, 'context'>;
  role?: UseRoleProps['role'];
  visible?: Variant;
  hidden?: Variant;
  floatingOptions?: UseFloatingOptions;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}
