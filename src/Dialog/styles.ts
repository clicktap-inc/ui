import { Dialog } from 'react-aria-components';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { defaultTheme } from '../defaultTheme';

const dialogAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.8);
  }

  to {
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const StyledDialog = styled(Dialog)`
  padding: 2rem;
  outline: none;
  box-shadow: 0 0.5rem 1.5rem rgba(0 0 0 / 0.1);
  border-radius: 0.5rem;
  background: ${({ theme }) =>
    theme?.colors?.white ?? defaultTheme.colors.white};
  border: 1px solid
    ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
  outline: none;
  max-width: max-content;
  width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledDialogAnimations = createGlobalStyle`
  [data-entering] ${StyledDialog} {
    animation: ${dialogAnimation} 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  [data-exiting] ${StyledDialog} {
    animation: ${dialogAnimation} 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse;
  }
`;
