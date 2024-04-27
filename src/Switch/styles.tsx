import { Switch } from 'react-aria-components';
import styled from 'styled-components';
import { defaultTheme } from '../defaultTheme';

export const Indicator = styled.div`
  width: 4rem;
  height: 2.5rem;
  border: 1px solid
    ${({ theme }) =>
      theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
  background: transparent;
  border-radius: 1.5rem;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms;

  &:before {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    margin: calc(0.5rem - 1px);
    background: ${({ theme }) =>
      theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
    border-radius: 1.25rem;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms;
  }
`;

export const StyledSwitch = styled(Switch)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) =>
    theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
  forced-color-adjust: none;

  &[data-hovered] ${Indicator} {
    border-color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
  }

  &[data-disabled] ${Indicator} {
    background: ${({ theme }) =>
      theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
  }

  &[data-pressed] ${Indicator} {
    border-color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};

    &:before {
      background: ${({ theme }) =>
        theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    }
  }

  &[data-focused] ${Indicator} {
    border-color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    outline: 2px solid
      ${({ theme }) =>
        theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
  }

  &[data-selected] {
    ${Indicator} {
      border-color: ${({ theme }) =>
        theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
      background: ${({ theme }) =>
        theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};

      &:before {
        background: ${({ theme }) =>
          theme?.colors?.white ?? defaultTheme.colors.white};
        transform: translateX(100%);
      }
    }

    &[data-hovered] ${Indicator} {
      border-color: ${({ theme }) =>
        theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    }
    &[data-focused] ${Indicator} {
      border-color: ${({ theme }) =>
        theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    }

    &[data-pressed] {
      ${Indicator} {
        border-color: ${({ theme }) =>
          theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
        background: ${({ theme }) =>
          theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
      }
    }
  }
`;
