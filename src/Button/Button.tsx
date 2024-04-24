import { StyledButton } from './styles';
import { ButtonProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Button({
  children,
  isDisabled = false,
  isLoading = false,
  size = 'md',
  variant = 'solid',
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      isDisabled={isDisabled || isLoading}
      isLoading={isLoading}
      size={size}
      variant={variant}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
