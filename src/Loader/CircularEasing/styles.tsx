import styled, { keyframes } from 'styled-components';
import { CircularEasingProps } from './types';

export const Rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

export const Loader = styled.div<Omit<CircularEasingProps, 'stroke'>>`
  position: relative;
  margin: 0;
  width: ${({ width }) => width}px;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

export const StyledSvg = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const StyledCircle = styled.circle<Omit<CircularEasingProps, 'width'>>`
  stroke: ${({ stroke }) => stroke};
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${Dash} 1.5s ease-in-out infinite;
`;
