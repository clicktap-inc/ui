'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type LinkConfig = {
  /** Base URL for external link detection */
  baseUrl?: string;
};

const LinkContext = createContext<LinkConfig>({});

type LinkProviderProps = {
  children: ReactNode;
  config: LinkConfig;
};

export function LinkProvider({ children, config }: LinkProviderProps) {
  return <LinkContext.Provider value={config}>{children}</LinkContext.Provider>;
}

export function useLinkConfig() {
  return useContext(LinkContext);
}
