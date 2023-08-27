import { styled } from '../theming/theming';

export const StyledModalRoot = styled.div<{ open?: boolean }>`
  position: fixed;
  z-index: 50;
  inset: 0px;
  display: flex;
  min-height: 100%;
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
`;

export const StyledModalBackdrop = styled.div`
  position: fixed;
  z-index: -1;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors?.white};
  padding: 2rem;
  border-radius: 0.25rem;
`;

export const StyledModalCloseButtonWrap = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
`;

export const StyledModalCloseButton = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
`;

export default StyledModalRoot;
