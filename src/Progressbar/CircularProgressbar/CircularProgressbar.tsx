import { CircularProgressbarProps } from './types';
import { Root, Block, Label, Bar, Fill, Value } from './styles';

export function CircularProgressbar({
  label,
  value = 0,
  showValue = true,
  size = 60,
  strokeWidth = 6,
  ...props
}: CircularProgressbarProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Root aria-label="Loading..." {...props} value={value}>
      {({ percentage = 0 }) => (
        <Block>
          <Label>{label}</Label>
          <svg width={size} height={size} fill="none">
            <Bar cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
            <Fill
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={((100 - percentage) / 100) * circumference}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
            {showValue && (
              <Value
                x="50%"
                y="50%"
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {percentage}%
              </Value>
            )}
          </svg>
        </Block>
      )}
    </Root>
  );
}

export default CircularProgressbar;
