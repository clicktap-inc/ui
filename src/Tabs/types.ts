import { ReactNode } from 'react';
import type {
  TabListProps as AriaTabListProps,
  TabProps as AriaTabProps,
} from 'react-aria-components';

export type TabItem = {
  id: number | string;
  title: ReactNode;
  content: ReactNode;
};

export interface TabListProps extends AriaTabListProps<TabItem> {
  variant?: 'solid' | 'outline' | 'underline' | 'base';
}

export interface TabProps extends AriaTabProps {
  variant?: 'solid' | 'outline' | 'underline' | 'enclosed' | 'base';
}
