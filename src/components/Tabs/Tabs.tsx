'use client';

import { Tabs as AriaTabs } from 'react-aria-components';
import { LayoutGroup } from 'framer-motion';
import { createContext, useId } from 'react';
import { cn } from '../../utils/cn';
import type { TabsProps } from './Tabs.types';

/** @todo consider making available through use hook instead */
export const TabsOrientationContext =
  createContext<TabsProps['orientation']>('horizontal');

export function Tabs({ children, className, ...props }: TabsProps) {
  const id = useId();

  return (
    <TabsOrientationContext.Provider value={props.orientation ?? 'horizontal'}>
      <LayoutGroup id={id}>
        <AriaTabs
          className={cn(
            'flex flex-col w-full px-0 py-2',
            props.orientation === 'vertical' && 'orientation-vertical:flex-row',
            className
          )}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          {children}
        </AriaTabs>
      </LayoutGroup>
    </TabsOrientationContext.Provider>
  );
}

export default Tabs;
