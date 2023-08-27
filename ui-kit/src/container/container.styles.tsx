import { spacing } from '../spacing/spacing.styles';
import { styled, defaultTheme } from '../theming/theming';
import { ContainerProps } from './container.props';

const getMediaQueries = (
  screens: { [s: string]: string } | ArrayLike<string>
) => {
  let breakpointCss = '';
  Object.values(screens).forEach((screen) => {
    breakpointCss += `
      @media (min-width: ${screen}) {
        max-width: ${screen};
      }
    `;
  });
  return breakpointCss;
};

export const StyledContainer = styled.div<ContainerProps>`
  width: 100%;

  ${(props) => spacing(props)}

  ${(props) =>
    props.theme.screens
      ? getMediaQueries(props.theme.screens)
      : getMediaQueries(defaultTheme.screens)}
`;

export default StyledContainer;
