'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type RouteProviderConfig = {
  /** Whether the user is currently logged in */
  isLoggedIn: boolean;
};

const defaultConfig: RouteProviderConfig = {
  isLoggedIn: false,
};

const RouteContext = createContext<RouteProviderConfig>(defaultConfig);

type RouteProviderProps = {
  children: ReactNode;
  config: RouteProviderConfig;
};

export function RouteProvider({ children, config }: RouteProviderProps) {
  return (
    <RouteContext.Provider value={config}>{children}</RouteContext.Provider>
  );
}

export function useRouteConfig() {
  return useContext(RouteContext);
}
