import type { ReactNode } from 'react';

export type AvatarGroupProps = {
  /** Whether to display avatars in a grid layout */
  isGrid?: boolean;
  /** Custom render function for the count indicator */
  renderCount?: (count: number) => ReactNode;
  /** Additional class name */
  className?: string;
};
