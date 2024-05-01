import { ModalOverlay } from 'react-aria-components';
import { keyframes, styled } from 'styled-components';
import { defaultTheme } from '../defaultTheme';

const overlayAnimation = keyframes`
  0% {
    opacity: 0;
    backdrop-filter: blur(0);
  }

  100% {
    opacity: 1;
    backdrop-filter: blur(10px);
  }
`;

export const StyledModalOverlay = styled(ModalOverlay)`
  backdrop-filter: blur(10px);
  background: ${({ theme }) =>
    `rgb(from ${
      theme?.colors?.black ?? defaultTheme.colors.black
    } r g b / 30%)`};
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--visual-viewport-height);

  &[data-entering] {
    animation: ${overlayAnimation} 300ms;
  }

  &[data-exiting] {
    animation: ${overlayAnimation} 300ms reverse;
  }
`;

export default { StyledModalOverlay };
