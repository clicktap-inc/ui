'use client';

import { TabPanel as AriaTabPanel } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { TabPanelProps } from './TabPanel.types';

export function TabPanel({ children, className, ...props }: TabPanelProps) {
  return (
    <AriaTabPanel className={cn('flex grow py-4 px-0', className)} {...props}>
      {children}
    </AriaTabPanel>
  );
}

export default TabPanel;
