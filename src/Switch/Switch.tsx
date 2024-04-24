import { SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { Indicator, StyledSwitch } from './styles';

interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
  children: React.ReactNode;
}

export function Switch({ children, ...props }: SwitchProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledSwitch {...props}>
      <Indicator />
      {children}
    </StyledSwitch>
  );
}

export default Switch;
