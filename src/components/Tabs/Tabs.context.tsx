'use client';

import { createContext } from 'react';

export const TabsOrientationContext: React.Context<'horizontal' | 'vertical'> =
  createContext<'horizontal' | 'vertical'>('horizontal');

export default TabsOrientationContext;
