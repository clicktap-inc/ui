import styled, { css } from 'styled-components';

import { palette } from '../palette/palette';
import { SvgProps } from './svg.props';

export const StyledSvg = styled.svg.withConfig({
  // shouldForwardProp: (prop, defaultValidatorFn) =>
  //   !['stroke', 'fill', 'strokeWidth'].includes(prop) &&
  //   defaultValidatorFn(prop),
})<SvgProps>`
  ${({ fill, stroke, strokeWidth, theme, css: cssOverride }) => css`
    fill: ${fill && fill !== 'none' ? palette(theme, fill) : 'none'};
    stroke: ${stroke && stroke !== 'none' ? palette(theme, stroke) : 'none'};
    stroke-width: ${strokeWidth};
    ${cssOverride};
  `}
`;

export default {
  StyledSvg,
};
