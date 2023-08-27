import { Children, isValidElement } from 'react';
import { ButtonProps, ButtonTextProps } from './button.props';
import { StyledButton } from './button.styles';

function Text({ children }: ButtonTextProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export function Button({
  shape = 'default',
  variant = 'solid',
  disabled = false,
  state = 'idle',
  size = 'sm',
  ...rest
}: ButtonProps) {
  const elements = Children.map(rest.children, (child) => {
    if (typeof child === 'string' || typeof child === 'number')
      return <Text>{child}</Text>;

    if (!isValidElement(child)) {
      return null; /** @todo should we error here instead? */
    }

    switch (child.type) {
      case Text:
        return child;
      default:
        /** @todo should we error here? */
        return null;
    }
  });

  return (
    <StyledButton
      shape={shape}
      variant={variant}
      disabled={disabled}
      state={state}
      type="button"
      size={size}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {state === 'pending' ? 'Loading...' : elements}
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

Button.Text = Text;
// Button.themes = { primary: {}, secondary: {}, tertiary: {} };
// Button.themes.primary = primary;
// Button.themes.secondary = secondary;
// Button.themes.tertiary = tertiary;

export default Button;
