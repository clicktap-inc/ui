import type {
  TabProps as AriaTabProps,
  TabRenderProps as AriaTabRenderProps,
} from 'react-aria-components';

export interface TabProps extends AriaTabProps {
  variant?: 'solid' | 'outline' | 'underline' | 'enclosed' | 'base';
}

export type TabRenderProps = AriaTabRenderProps;
