import {
  DateField,
  DateInput,
  DateInputRenderProps,
  DateSegment,
  FieldError,
  Label,
  Text,
} from 'react-aria-components';
import { styled } from 'styled-components';
import { defaultTheme } from '../defaultTheme';

export const StyledDateField = styled(DateField)`
  color: ${({ theme }) =>
    theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
`;

export const StyledDateInput = styled(DateInput)<Partial<DateInputRenderProps>>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme }) =>
      theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
  font-size: 0.9rem;
  padding: 0 0.25rem;
  height: 2.5rem;
  margin: 0;
  border-radius: 0.375rem;
  background: ${({ theme }) =>
    theme?.colors?.white ?? defaultTheme.colors.white};
  color: ${({ theme }) =>
    theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
  width: 100%;
  transition: all ease 200ms;

  &[data-hovered] {
    border: 1px solid
      ${({ theme }) =>
        theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
  }

  &[data-focus-within] {
    border: 1px solid
      ${({ theme }) =>
        theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    outline: 2px solid
      ${({ theme }) =>
        theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
  }

  &[data-disabled] {
    border: 1px solid
      ${({ theme }) =>
        theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
    background: ${({ theme }) =>
      theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
  }

  &[data-invalid] {
    border: 1px solid
      ${({ theme }) =>
        theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
    background: ${({ theme }) =>
      theme?.colors?.red?.[100] ?? defaultTheme.colors.red[100]};
    color: ${({ theme }) =>
      theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};

    &[data-hovered] {
      border: 1px solid
        ${({ theme }) =>
          theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};
    }

    &[data-focus-within] {
      border: 1px solid
        ${({ theme }) =>
          theme?.colors?.red?.[600] ?? defaultTheme.colors.red[600]};
      outline: 2px solid
        ${({ theme }) =>
          theme?.colors?.red?.[200] ?? defaultTheme.colors.red[200]};
    }
  }
`;

export const StyledDateSegment = styled(DateSegment)`
  padding: 0.25rem;
  font-variant-numeric: tabular-nums;
  text-align: end;
  color: ${({ theme }) =>
    theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};

  &[data-invalid] {
    color: ${({ theme }) =>
      theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
  }

  &[data-disabled] {
    cursor: default;
    user-select: none;
    color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
  }

  &[data-focused],
  &[data-focus-visible] {
    outline: 1px auto
      ${({ theme }) =>
        theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
  }

  &[data-type='literal'] {
    padding: 0;
  }

  &[data-placeholder] {
    color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};

    &[data-invalid] {
      color: ${({ theme }) =>
        theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};

      &:focus {
        color: ${({ theme }) =>
          theme?.colors?.white ?? defaultTheme.colors.white};
      }
    }
  }

  &:focus:not([aria-readonly]) {
    color: ${({ theme }) =>
      theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
    background: ${({ theme }) =>
      theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
    outline: none;
    border-radius: 0.375rem;
    caret-color: transparent;

    &[data-invalid] {
      background: ${({ theme }) =>
        theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
      color: ${({ theme }) =>
        theme?.colors?.white ?? defaultTheme.colors.white};
    }
  }
`;

export const StyledLabel = styled(Label)`
  display: flex;
  font-size: 0.8rem;
  color: ${({ theme }) =>
    theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
`;

export const StyledFieldError = styled(FieldError)`
  display: flex;
  color: ${({ theme }) =>
    theme?.colors?.red?.[500] ?? defaultTheme.colors.red[500]};
  font-size: 0.8rem;
`;

export const StyledText = styled(Text)`
  display: flex;
  color: ${({ theme }) =>
    theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
  font-size: 0.8rem;
`;
