import styled from 'styled-components';
import { defaultTheme } from '../defaultTheme';
import { ContainerProps } from './types';

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
  margin: 0 auto;
  padding: 0 1rem;

  ${({ theme }) =>
    theme.screens
      ? getMediaQueries(theme.screens)
      : getMediaQueries(defaultTheme.screens)}
`;

export default StyledContainer;
