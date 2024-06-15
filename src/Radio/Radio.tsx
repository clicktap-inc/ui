import { ReactNode } from 'react';
import {
  RadioRenderProps,
  RadioProps as UiRadioProps,
} from 'react-aria-components';
import { Control, Indicator, StyledRadio } from './styles';

interface RadioSlots {
  control?: ReactNode | ((values: RadioRenderProps) => ReactNode);
}

export interface RadioProps extends UiRadioProps {
  children?: ReactNode | ((values: RadioRenderProps) => ReactNode);
  slots?: RadioSlots;
}

function ControlSlot({
  control,
  ...props
}: RadioRenderProps & Pick<RadioSlots, 'control'>) {
  if (!control) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Control className="radio-control" {...props}>
        <Indicator />
      </Control>
    );
  }
  return typeof control === 'function' ? control(props) : control;
}

export function Radio({ children, slots, ...props }: RadioProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledRadio {...props}>
      {(renderProps) => (
        <>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ControlSlot control={slots?.control} {...renderProps} />
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </StyledRadio>
  );
}

Radio.defaultProps = {
  children: undefined,
  slots: undefined,
};

export default Radio;
