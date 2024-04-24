import { MeterProps } from './types';
import {
  StyledMeter,
  StyledMeterHeader,
  StyledLabel,
  StyledValue,
  StyledBar,
  StyledBarFill,
} from './styles';

export function Meter({
  label,
  showValue = true,
  value = 0,
  minValue = 0,
  maxValue = 100,
  formatOptions = { style: 'percent' },
  ...props
}: MeterProps) {
  return (
    <StyledMeter
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      formatOptions={formatOptions}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {({ percentage, valueText }) => (
        <>
          {(label || showValue) && (
            <StyledMeterHeader>
              {label && <StyledLabel>{label}</StyledLabel>}
              {showValue && <StyledValue>{valueText}</StyledValue>}
            </StyledMeterHeader>
          )}

          <StyledBar>
            <StyledBarFill
              initial={{ width: `${percentage}%` }}
              animate={{ width: `${percentage}%` }}
              transition={{
                type: 'spring',
                bounce: 0,
              }}
            />
          </StyledBar>
        </>
      )}
    </StyledMeter>
  );
}

export default Meter;
