import styled, { keyframes } from 'styled-components';

export const PulseAnimation = keyframes`
    0% {
        transform: scale(1);
        opacity: 1;
    }
    45% {
        transform: scale(0.1);
        opacity: 0.7;
    }
    80% {
        transform: scale(1);
        opacity: 1;
    }
`;

export const Dot = styled.span<{ speedMultiplier: number; i: number }>`
  background-color: ${({ theme }) => theme.colors.slate[300]};
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.1rem;
  border-radius: 0.5rem;
  animation: ${PulseAnimation}
    ${({ speedMultiplier }) => 0.75 / speedMultiplier}s
    ${({ i, speedMultiplier }) => (i * 0.12) / speedMultiplier}s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation-fill-mode: both;
`;
