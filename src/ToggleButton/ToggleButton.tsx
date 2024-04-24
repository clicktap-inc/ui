import { ToggleButtonProps } from './types';
import { Root } from './styles';

export function ToggleButton({
  children,
  size = 'md',
  variant = 'solid',
  ...props
}: ToggleButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Root {...props} size={size} variant={variant}>
      {children}
    </Root>
  );
}

export default ToggleButton;
