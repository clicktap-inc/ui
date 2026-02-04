'use client';

import { Tabs as AriaTabs } from 'react-aria-components';
import { LayoutGroup } from 'framer-motion';
import { useId } from 'react';
import { cn } from '../../utils/cn';
import type { TabsProps } from './Tabs.types';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabsOrientationContext } from './Tabs.context';

export function Tabs({ children, className, ...props }: TabsProps) {
  const id = useId();

  return (
    <TabsOrientationContext.Provider value={props.orientation ?? 'horizontal'}>
      <LayoutGroup id={id}>
        <AriaTabs
          className={cn(
            'flex flex-col w-full px-0 py-2',
            props.orientation === 'vertical' && 'orientation-vertical:flex-row',
            className,
          )}
          {...props}
        >
          {children}
        </AriaTabs>
      </LayoutGroup>
    </TabsOrientationContext.Provider>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
