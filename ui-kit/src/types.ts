import type { FC } from 'react';

export interface UIComponent<P = unknown> extends FC<P> {
  componentId: string;
}

/** @todo how to make this generic? */
export interface CompoundUIComponent<P = unknown> extends UIComponent<P> {
  [key: string]: unknown;
}
