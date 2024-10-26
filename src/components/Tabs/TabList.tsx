'use client';

import { useContext } from 'react';
import { TabList as AriaTabList } from 'react-aria-components';
import { TabsOrientationContext } from './Tabs';
import { cn } from '../../utils/cn';
import { BaseTab } from './Tab';
import type { TabListProps } from './TabList.types';

export function TabList({
  items,
  children,
  variant = 'base',
  className,
  ...props
}: TabListProps) {
  const orientation = useContext(TabsOrientationContext);

  return (
    <AriaTabList
      className={cn(
        'flex flex-row w-full flex-wrap gap-2 relative',
        orientation === 'vertical' &&
          'orientation-vertical:max-w-max orientation-vertical:flex-col orientation-vertical:justify-start',
        [
          variant === 'solid' && ['bg-slate-200 rounded-xl p-1'],
          variant === 'outline' && [
            'border-solid border-2 border-slate-200 rounded-xl p-1',
          ],
          variant === 'underline' &&
            orientation === 'vertical' && [
              'before:block before:absolute before:inset-y-0 before:right-0 before:w-px before:bg-slate-200',
            ],
          variant === 'underline' &&
            orientation === 'horizontal' && [
              'before:block before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-slate-200',
            ],
        ],
        className
      )}
      items={items}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children ||
        ((item) => <BaseTab orientation={orientation}>{item.title}</BaseTab>)}
    </AriaTabList>
  );
}

export default TabList;
