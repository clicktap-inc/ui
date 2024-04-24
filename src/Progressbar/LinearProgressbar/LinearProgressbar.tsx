import type { LinearProgressbarProps } from './types';
import { Root, Information, Label, Value, Bar, Fill } from './styles';

export function LinearProgressbar({
  label,
  isIndeterminate,
  showValue = true,
  width,
  ...props
}: LinearProgressbarProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Root {...props} width={width}>
      {({ percentage, valueText }) => (
        <>
          <Information>
            <Label>{label}</Label>
            {showValue && <Value>{valueText}</Value>}
          </Information>
          <Bar>
            <Fill
              isIndeterminate={isIndeterminate}
              width={typeof percentage === 'number' ? `${percentage}%` : ''}
            />
          </Bar>
        </>
      )}
    </Root>
  );
}

export default LinearProgressbar;
