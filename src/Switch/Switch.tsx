import {
  SwitchProps as AriaSwitchProps,
  SwitchRenderProps,
} from 'react-aria-components';
import { Indicator, StyledSwitch } from './styles';

export function Switch({ children, ...props }: AriaSwitchProps) {
  return (
    <StyledSwitch
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {(renderProps: SwitchRenderProps) => (
        <>
          <Indicator className="switch-indicator" />
          {typeof children === 'function'
            ? children({
                defaultChildren: undefined,
                ...renderProps,
              })
            : children}
        </>
      )}
    </StyledSwitch>
  );
}

export default Switch;
