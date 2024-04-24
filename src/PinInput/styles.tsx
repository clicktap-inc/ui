import styled from 'styled-components';
import {
  FieldError,
  Group,
  Input,
  Label,
  Text,
  TextField,
} from 'react-aria-components';

export const StyledGroup = styled(Group)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.slate[300]};
  font-size: 0.9rem;
  padding: 0 0.5rem;
  height: 2.5rem;
  margin: 0;
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.slate[900]};
  width: 100%;
  text-align: center;
  transition: all ease 200ms;

  &[data-hovered] {
    border: 1px solid ${({ theme }) => theme.colors.slate[400]};
  }

  &[data-focused] {
    border: 1px solid ${({ theme }) => theme.colors.slate[400]};
    outline: 2px solid ${({ theme }) => theme.colors.slate[200]};
  }

  &[data-disabled] {
    border: 1px solid ${({ theme }) => theme.colors.slate[200]};
    background: ${({ theme }) => theme.colors.slate[100]};
  }

  &[data-invalid] {
    border: 1px solid ${({ theme }) => theme.colors.red[500]};
    background: ${({ theme }) => theme.colors.red[100]};
    color: ${({ theme }) => theme.colors.red[600]};

    &[data-hovered] {
      border: 1px solid ${({ theme }) => theme.colors.red[600]};
    }

    &[data-focused] {
      border: 1px solid ${({ theme }) => theme.colors.red[600]};
      outline: 2px solid ${({ theme }) => theme.colors.red[200]};
    }
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.slate[400]};
  }
`;

export const StyledLabel = styled(Label)`
  display: flex;
  flex: 1 0 100%;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const StyledTextField = styled(TextField)`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  color: ${({ theme }) => theme.colors.slate[900]};
`;

export const StyledHiddenTextField = styled(TextField)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 0 100%;
  color: ${({ theme }) => theme.colors.slate[900]};
`;

export const StyledFieldError = styled(FieldError)`
  display: flex;
  flex: 1 0 100%;
  color: ${({ theme }) => theme.colors.red[500]};
  font-size: 0.8rem;
`;

export const StyledText = styled(Text)`
  display: flex;
  flex: 1 0 100%;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-size: 0.8rem;
`;
