import { forwardRef } from 'react';
import { TooltipProps } from '@nextui-org/tooltip';
import { StyledTooltip } from './styles';

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    return (
      <StyledTooltip
        classNames={{ base: ['tooltip'], content: ['tooltip-content'] }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
      />
    );
  }
);

export default Tooltip;
