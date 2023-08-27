import { SvgProps } from './svg.props';
import { StyledSvg } from './svg.styles';
// import theme from '../theming/theming';

export function Svg({ children, ...rest }: SvgProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledSvg xmlns="http://www.w3.org/2000/svg" {...rest}>
      {children}
    </StyledSvg>
  );
}

Svg.defaultProps = {
  fill: 'none',
  stroke: 'none',
  strokeWidth: 1,
};

export default Svg;
