import { Loader, StyledCircle, StyledSvg } from './styles';
import { CircularEasingProps } from './types';

export function CircularEasing({
  width,
  stroke,
  strokeLinecap = 'round',
  strokeWidth = 5,
  ...props
}: CircularEasingProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Loader width={width} {...props}>
      <StyledSvg viewBox="25 25 50 50">
        <StyledCircle
          className="path"
          cx="50"
          cy="50"
          fill="none"
          r="20"
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
      </StyledSvg>
    </Loader>
  );
}

export default CircularEasing;
