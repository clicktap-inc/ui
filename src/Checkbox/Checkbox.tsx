import {
  CheckboxProps as UiCheckboxProps,
  CheckboxRenderProps,
} from 'react-aria-components';
import { ReactNode } from 'react';
import { Control, StyledCheckbox, StyledSvg } from './styles';

interface CheckboxSlots {
  control?: ReactNode | ((values: CheckboxRenderProps) => ReactNode);
}

export interface CheckboxProps extends UiCheckboxProps {
  slots?: CheckboxSlots;
}

function ControlSlot({
  control,
  ...rest
}: CheckboxRenderProps & Pick<CheckboxSlots, 'control'>) {
  if (!control) {
    return (
      <Control className="checkbox-control">
        <StyledSvg viewBox="0 0 18 18" aria-hidden="true">
          {rest.isIndeterminate ? (
            <rect x={1} y={7.5} width={15} height={3} />
          ) : (
            <polyline points="1 9 7 14 15 4" />
          )}
        </StyledSvg>
      </Control>
    );
  }
  return typeof control === 'function' ? control(rest) : control;
}

export function Checkbox({ children, slots, ...props }: CheckboxProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledCheckbox {...props}>
      {(renderProps) => (
        <>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ControlSlot control={slots?.control} {...renderProps} />
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </StyledCheckbox>
  );
}

Checkbox.defaultProps = {
  slots: {
    control: undefined,
  },
};

export default Checkbox;
