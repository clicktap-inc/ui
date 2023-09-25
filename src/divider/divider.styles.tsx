import styled from 'styled-components';
import { defaultTheme } from '../theming/theming';
import { DividerProps } from './divider.props';
import { Palette, palette } from '../palette/palette';

export const DividerWrapper = styled.div`
  position: relative;
  ${(props) =>
    props.color &&
    `background-color: ${
      palette(defaultTheme, props.color as Palette) ?? 'transparent'
    };`};
`;

export const DividerLineWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
`;

export const DividerLine = styled.div<Pick<DividerProps, 'color'>>`
  width: 100%;
  border-top: 1px solid;
  ${(props) =>
    props.color &&
    `border-color: ${palette(defaultTheme, props.color) ?? '#000'};`};
`;

export const DividerOverlay = styled.div<Pick<DividerProps, 'overlayX'>>`
  position: relative;
  display: flex;
  justify-content: center;

  ${(props) => {
    switch (props.overlayX) {
      case 'left':
        return 'justify-content: flex-start;';
      case 'center':
        return 'justify-content: center;';
      case 'right':
        return 'justify-content: flex-end;';
      default:
        return 'justify-content: center;';
    }
  }}
`;
