import styled, { css } from 'styled-components';
import { AvatarRoot } from '../avatar/avatar';
import { AvatarGroupProps } from './avatarGroup.props';

// function getTheme(themeOverride?: Theme) {
//   return themeOverride && Object.keys(themeOverride).length > 0
//     ? themeOverride
//     : defaultTheme;
// }

export const StyledAvatarGroup = styled.div<AvatarGroupProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'horizontal' ? 'row' : 'column'};

  ${AvatarRoot}:before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    box-shadow: ${({ theme }) => theme.colors?.white} 0 0 0 2px;
  }

  ${AvatarRoot} + ${AvatarRoot} {
    ${({ theme, direction }) => {
      switch (direction) {
        case 'vertical':
          return css`
            margin-top: -${theme.spacing?.[2]};
          `;

        case 'horizontal':
        default:
          return css`
            margin-left: -${theme.spacing?.[2]};
          `;
      }
    }}
  }

  ${({ css: cssOverride }) => cssOverride}
`;

export default {
  StyledAvatarGroup,
};
