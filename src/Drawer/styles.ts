import { Dialog } from 'react-aria-components';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const topAnimation = keyframes`
  from  { transform: translateY(-100%); }
  to    { transform: translateY(0); }
`;

const rightAnimation = keyframes`
  from  { transform: translateX(100%); }
  to    { transform: translateX(0); }
`;

const bottomAnimation = keyframes`
  from  { transform: translateY(100%); }
  to    { transform: translateY(0); }
`;

const leftAnimation = keyframes`
  from  { transform: translateX(-100%); }
  to    { transform: translateX(0); }
`;

export const StyledDrawer = styled(Dialog)`
  padding: 2rem;
  position: fixed;
  outline: none;
  background: ${({ theme }) => theme.colors.white};
  border: 0 ${({ theme }) => theme.colors.slate[200]} solid;
  animation-duration: 300ms;

  &[data-direction='top'] {
    inset: 0 0 calc(100% - 20rem) 0;
    border-bottom-width: 1px;
    box-shadow: 0 0.5rem 1.5rem rgba(0 0 0 / 0.1);
  }

  &[data-direction='right'] {
    inset: 0 0 0 calc(100% - 20rem);
    border-left-width: 1px;
    box-shadow: -0.5rem 0 1.5rem rgba(0 0 0 / 0.1);
  }

  &[data-direction='bottom'] {
    inset: calc(100% - 20rem) 0 0 0;
    border-top-width: 1px;
    box-shadow: 0 -0.5rem 1.5rem rgba(0 0 0 / 0.1);
  }

  &[data-direction='left'] {
    inset: 0 calc(100% - 20rem) 0 0;
    border-right-width: 1px;
    box-shadow: 0.5rem 0 1.5rem rgba(0 0 0 / 0.1);
  }
`;

export const StyledDrawerAnimations = createGlobalStyle`
  [data-exiting] ${StyledDrawer} {
    animation-direction: reverse;
    animation-timing-function: ease-in;
  }

  [data-entering], 
  [data-exiting] {
    ${StyledDrawer} {
      &[data-direction='top'] {
        animation-name: ${topAnimation};
      }

      &[data-direction='right'] {
        animation-name: ${rightAnimation};
      }

      &[data-direction='bottom'] {
        animation-name: ${bottomAnimation};
      }

      &[data-direction='left'] {
        animation-name: ${leftAnimation};
      }
    }
  }
`;
