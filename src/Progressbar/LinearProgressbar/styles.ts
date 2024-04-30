import { styled } from 'styled-components';
import { ProgressBar, Label as AriaLabel } from 'react-aria-components';
import type { LinearProgressbarProps } from './types';
import { defaultTheme } from '../../defaultTheme';

export const Root = styled(ProgressBar)<{
  width: LinearProgressbarProps['width'];
}>`
  width: ${({ width }) => width || '100%'};
  overflow: hidden;
`;

export const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
`;

export const Label = styled(AriaLabel)`
  font-size: 0.875rem;
`;

export const Value = styled.span`
  font-size: 0.875rem;
`;

export const Bar = styled.div`
  forced-color-adjust: none;
  height: 0.625rem;
  border-radius: 0.3rem;
  overflow: hidden;
  will-change: transform;
  background: ${({ theme }) =>
    theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
`;

export const Fill = styled.div<{
  isIndeterminate: LinearProgressbarProps['isIndeterminate'];
  width: string;
}>`
  width: ${({ width, isIndeterminate }) => (isIndeterminate ? '40%' : width)};
  transition: ${({ isIndeterminate }) =>
    isIndeterminate ? 'none' : 'width 600ms ease-in-out'};
  height: 100%;
  background: ${({ theme }) =>
    theme?.colors?.slate?.[800] ?? defaultTheme.colors.slate[800]};
  border-radius: inherit;
  animation: ${({ isIndeterminate }) =>
    isIndeterminate ? 'indeterminate 1.5s infinite ease-in-out' : 'none'};

  @keyframes indeterminate {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(250px);
    }
  }
`;
