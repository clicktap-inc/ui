import { ButtonProps } from './button.props';
import { StyledButton } from './button.styles';

export function Button({
  shape = 'default',
  variant = 'solid',
  // disabled = false,
  state = 'idle',
  size = 'sm',
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      shape={shape}
      variant={variant}
      // disabled={disabled}
      state={state}
      type="button"
      size={size}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  shape: 'default',
  variant: 'solid',
  disabled: false,
  state: 'idle',
  size: 'md',
};

export default Button;
