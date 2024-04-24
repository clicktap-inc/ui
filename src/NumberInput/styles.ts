import { Group, NumberField } from 'react-aria-components';
import styled from 'styled-components';
import { StyledButton } from '../Button/styles';
import { StyledInput } from '../Input/styles';

export const StyledNumberField = styled(NumberField)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledGroup = styled(Group)`
  display: flex;
  border-radius: 0.375rem;

  ${StyledButton} {
    cursor: pointer;
    padding: 0;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;

    :first-of-type {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    :last-of-type {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  ${StyledInput} {
    border-radius: 0;

    &[data-focused] {
      outline: none;
    }
  }

  &[data-hovered] {
    ${StyledButton}, ${StyledInput} {
      border-color: ${({ theme }) => theme.colors.slate[400]};
    }
  }

  &[data-focus-within] {
    outline: 2px solid ${({ theme }) => theme.colors.slate[200]};

    &[data-invalid] {
      outline: 2px solid ${({ theme }) => theme.colors.red[200]};
    }

    ${StyledButton}, ${StyledInput} {
      border-color: ${({ theme }) => theme.colors.slate[400]};
    }
  }

  &[data-disabled] {
    background: ${({ theme }) => theme.colors.slate[100]};

    ${StyledButton} {
      cursor: default;
    }

    ${StyledButton}, ${StyledInput} {
      border-color: ${({ theme }) => theme.colors.slate[200]};
    }
  }

  &[data-invalid] {
    ${StyledButton}, ${StyledInput} {
      border-color: ${({ theme }) => theme.colors.red[500]};
      background: ${({ theme }) => theme.colors.red[100]};
      color: ${({ theme }) => theme.colors.red[600]};

      &[data-hovered] {
        border-color: ${({ theme }) => theme.colors.red[600]};
      }

      &[data-focused] {
        border-color: ${({ theme }) => theme.colors.red[600]};
      }
    }
  }

  &[aria-readonly] {
    ${StyledButton} {
      background: ${({ theme }) => theme.colors.slate[100]};
      border-color: ${({ theme }) => theme.colors.slate[200]};
      color: ${({ theme }) => theme.colors.slate[500]};
      cursor: default;
    }
  }
`;
