import { styled } from '../theming/theming';
import type { DrawerProps } from './drawer.props';

export const StyledContent = styled.div<{
  position: DrawerProps['position'];
}>`
  position: 'absolute',
  background: ${({ theme }) => theme.colors?.white};
  width: '300px';

  ${({ position }) => {
    switch (position) {
      case 'top':
        return `
          left: 0;
          right: 0;
          top: 0;
        `;
      case 'right':
        return `
          right: 0;
          top: 0;
          bottom: 0;
        `;
      case 'bottom':
        return `
          left: 0;
          right: 0;
          bottom: 0;
        `;
      case 'left':
      default:
        return `
          left: 0;
          top: 0;
          bottom: 0;
        `;
    }
  }}
`;

export default StyledContent;
