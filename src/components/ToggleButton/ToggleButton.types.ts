import { ToggleButtonProps as AriaToggleButtonProps } from 'react-aria-components';

export type ToggleButtonProps = AriaToggleButtonProps & {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};
