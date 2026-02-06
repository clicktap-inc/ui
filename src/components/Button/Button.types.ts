import type { ButtonProps as AriaButtonProps } from 'react-aria-components';

export type ButtonVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'primary'
  | 'secondary'
  | 'tertiary';

export type ButtonProps = AriaButtonProps & {
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
};
