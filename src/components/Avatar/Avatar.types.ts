import type { ReactNode } from 'react';

export type AvatarProps = {
  /** Custom icon to display instead of default user icon */
  icon?: ReactNode;
  /** Additional class name for the wrapper */
  className?: string;
  /** Whether the avatar is disabled */
  isDisabled?: boolean;
  /** Size of the avatar */
  size?: 'sm' | 'md' | 'lg';
  /** Custom class names for avatar parts */
  classNames?: {
    base?: string;
    icon?: string;
    name?: string;
    fallback?: string;
  };
  /** Whether to show a border around the avatar */
  isBordered?: boolean;
  /** Border radius of the avatar */
  radius?: 'full' | 'lg' | 'md' | 'sm' | 'none';
  /** Name/initials to display */
  name?: string;
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
};
