import { ButtonProps as AriaButtonProps } from 'react-aria-components';

export type ButtonProps = AriaButtonProps & {
  isLoading?: boolean;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};
