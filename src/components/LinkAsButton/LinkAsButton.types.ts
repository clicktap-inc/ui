import type { LinkProps } from '../Link/Link.types';
import type { ButtonProps } from '../Button/Button.types';

export type LinkAsButtonProps = LinkProps &
  Pick<ButtonProps, 'variant' | 'size'> & {
    isLoading?: boolean;
  };
