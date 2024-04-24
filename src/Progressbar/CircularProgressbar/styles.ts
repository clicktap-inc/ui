import styled from 'styled-components';
import { ProgressBar, Label as AriaLabel } from 'react-aria-components';

export const Root = styled(ProgressBar)`
  display: flex;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled(AriaLabel)`
  font-size: 0.875rem;
`;

export const Bar = styled.circle`
  stroke: ${({ theme }) => theme.colors.slate[300]};
`;

export const Fill = styled.circle`
  stroke: ${({ theme }) => theme.colors.slate[800]};
  transition: stroke-dashoffset 600ms ease-in-out;
`;

export const Value = styled.text`
  font-size: 0.875rem;
  fill: ${({ theme }) => theme.colors.slate[800]};
`;
