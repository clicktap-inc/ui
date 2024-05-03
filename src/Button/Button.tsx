import { forwardRef } from 'react';
import { StyledButton } from './styles';
import { ButtonProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      isDisabled = false,
      isLoading = false,
      size = 'md',
      variant = 'solid',
      ...props
    },
    ref
  ) {
    return (
      <StyledButton
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
        size={size}
        variant={variant}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
      />
    );
  }
);

export default Button;
