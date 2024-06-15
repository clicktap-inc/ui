import { Radio } from 'react-aria-components';
import { styled } from 'styled-components';
import { defaultTheme } from '../defaultTheme';

export const Control = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid
    ${({ theme }) =>
      theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
  border-radius: 50%;
  transition: all ease 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Indicator = styled.div`
  opacity: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
  transition: all ease 200ms;
`;

export const StyledRadio = styled(Radio)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

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

  &[data-selected] ${Indicator} {
    opacity: 1;
  }

  &[data-disabled] {
    color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
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

    ${Indicator} {
      background-color: ${({ theme }) =>
        theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
    }

    &[data-disabled] {
      color: ${({ theme }) =>
        theme?.colors?.red?.[400] ?? defaultTheme.colors.red[300]};
    }
    &[data-disabled] ${Control} {
      border-color: ${({ theme }) =>
        theme?.colors?.red?.[200] ?? defaultTheme.colors.red[200]};
      background: ${({ theme }) =>
        theme?.colors?.red?.[100] ?? defaultTheme.colors.red[100]};
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

    &[data-selected] {
      ${Control} {
        background: ${({ theme }) =>
          theme?.colors?.red?.[100] ?? defaultTheme.colors.red[100]};
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
`;
