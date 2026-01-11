'use client';

import { createContext } from 'react';
import type { TabsProps } from './Tabs.types';

export const TabsOrientationContext: React.Context<
  'horizontal' | 'vertical'
> = createContext<'horizontal' | 'vertical'>('horizontal');

export default TabsOrientationContext;
