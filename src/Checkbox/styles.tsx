import { Checkbox } from 'react-aria-components';
import styled from 'styled-components';
import { defaultTheme } from '../defaultTheme';

export const Control = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid
    ${({ theme }) =>
      theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
  border-radius: 4px;
  transition: all ease 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSvg = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: ${({ theme }) => theme?.colors?.white ?? defaultTheme.colors.white};
  stroke-width: 3px;
  stroke-dasharray: 22px;
  stroke-dashoffset: 66;
  transition: all 200ms;
`;

export const StyledCheckbox = styled(Checkbox)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) =>
    theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
  forced-color-adjust: none;

  &[data-hovered] ${Control} {
    border-color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
  }

  &[data-focused] ${Control} {
    border-color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    outline: 2px solid
      ${({ theme }) =>
        theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
  }

  &[data-disabled] {
    color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};

    &[data-indeterminate] {
      & ${StyledSvg} {
        stroke: none;
        fill: ${({ theme }) =>
          theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
      }
    }

    &[data-indeterminate] ${Control} {
      border-color: ${({ theme }) =>
        theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
      background: ${({ theme }) =>
        theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
    }
  }
  &[data-disabled] ${Control} {
    border-color: ${({ theme }) =>
      theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
    background: ${({ theme }) =>
      theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
  }

  &[data-invalid] {
    color: ${({ theme }) =>
      theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};

    ${Control} {
      background: ${({ theme }) =>
        theme?.colors?.red?.[100] ?? defaultTheme.colors.red[100]};
      color: ${({ theme }) =>
        theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};
      border: 1px solid
        ${({ theme }) =>
          theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
    }

    &[data-hovered] ${Control} {
      border: 1px solid
        ${({ theme }) =>
          theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};
    }

    &[data-focused] ${Control} {
      border: 1px solid
        ${({ theme }) =>
          theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};
      outline: 2px solid
        ${({ theme }) =>
          theme?.colors?.red?.[200] ?? defaultTheme.colors.red[200]};
    }

    &[data-selected],
    &[data-indeterminate] {
      ${Control} {
        background: ${({ theme }) =>
          theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
        border: 1px solid
          ${({ theme }) =>
            theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
      }

      &[data-pressed] ${Control} {
        background: ${({ theme }) =>
          theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};
        border: 1px solid
          ${({ theme }) =>
            theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};
      }
    }
  }

  &[data-selected],
  &[data-indeterminate] {
    ${Control} {
      border-color: ${({ theme }) =>
        theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
      background: ${({ theme }) =>
        theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
    }

    &[data-pressed] ${Control} {
      border-color: ${({ theme }) =>
        theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
      background: ${({ theme }) =>
        theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    }

    ${StyledSvg} {
      stroke-dashoffset: 44;
    }
  }

  &[data-indeterminate] {
    & ${StyledSvg} {
      stroke: none;
      fill: ${({ theme }) => theme?.colors?.white ?? defaultTheme.colors.white};
    }
  }
`;

export default StyledCheckbox;
