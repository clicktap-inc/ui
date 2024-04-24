import { TooltipProps } from '@nextui-org/tooltip';
import { StyledTooltip } from './styles';

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <StyledTooltip
      classNames={{ base: ['tooltip'], content: ['tooltip-content'] }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </StyledTooltip>
  );
}

export default Tooltip;
