import type { TabListProps as AriaTabListProps } from 'react-aria-components';
import type { ReactNode } from 'react';

export type TabItemType = {
  id: number | string;
  title: ReactNode;
  content: ReactNode;
};

export interface TabListProps extends AriaTabListProps<TabItemType> {
  variant?: 'solid' | 'outline' | 'underline' | 'base';
}
