import type { HTMLAttributes } from 'react';

export type CircularEasingProps = HTMLAttributes<HTMLDivElement> & {
  stroke: string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeWidth?: number;
  width: number;
};
