'use client';

import { createContext } from 'react';
import type { TabsProps } from './Tabs.types';

export const TabsOrientationContext =
  createContext<TabsProps['orientation']>('horizontal');

export default TabsOrientationContext;
