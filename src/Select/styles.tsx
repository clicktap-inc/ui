import styled from 'styled-components';
import {
  Button,
  ComboBox,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
  TextField,
} from 'react-aria-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const StyledComboBox = styled(ComboBox)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ComboBoxContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const StyledPopover = motion(styled(Popover)`
  padding: 0.4rem 0;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.375rem;
  width: 14rem;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.slate[300]};
`);

export const StyledInput = styled(Input).withConfig({
  shouldForwardProp: (prop) => !['isLoading'].includes(prop),
})<{ isLoading: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.slate[300]};
  font-size: 0.9rem;
  padding: 0 0.5rem;
  height: 2.5rem;
  margin: 0;
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.slate[900]};
  width: 100%;
  transition: all ease 200ms;

  &[data-hovered] {
    border: 1px solid ${({ theme }) => theme.colors.slate[400]};
  }

  &[data-focused] {
    border: 1px solid ${({ theme }) => theme.colors.slate[400]};
    outline: 2px solid ${({ theme }) => theme.colors.slate[200]};
  }

  &[data-disabled] {
    background: ${({ isLoading, theme }) =>
      isLoading ? theme.colors.white : theme.colors.slate[100]};
    border: 1px solid ${({ theme }) => theme.colors.slate[300]};
    color: ${({ isLoading, theme }) =>
      isLoading ? theme.colors.slate[900] : theme.colors.slate[500]};
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

    ::placeholder {
      color: ${({ theme }) => theme.colors.red[500]};
    }
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.slate[400]};
  }
`;

export const StyledButtonIcon = styled.svg.withConfig({
  shouldForwardProp: (prop) =>
    !['isDisabled', 'isInvalid', 'isOpen'].includes(prop),
})<{
  isDisabled: boolean;
  isInvalid: boolean;
  isOpen: boolean;
}>`
  transition: all ease 200ms;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0')});

  path {
    stroke: ${({ isDisabled, isInvalid, theme }) => {
      if (isInvalid) {
        return theme.colors.red[500];
      }
      if (isDisabled) {
        return theme.colors.slate[400];
      }

      return theme.colors.slate[900];
    }};
  }
`;

export const StyledLoader = styled.div`
  position: absolute;
  display: block;
  top: 0.5rem;
  right: 0.5rem;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  display: block;
  top: 0.5rem;
  right: 0;
  border: none;
  background: none;
`;

export const StyledLabel = styled(Label)`
  display: flex;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const StyledTextField = styled(TextField)`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.colors.slate[900]};
`;

export const StyledFieldError = styled(FieldError)`
  display: flex;
  color: ${({ theme }) => theme.colors.red[500]};
  font-size: 0.8rem;
`;

export const StyledText = styled(Text)`
  display: flex;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-size: 0.8rem;
`;

export const StyledListBoxItem = styled(ListBoxItem)`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  border-radius: 0.375rem;
  padding: 0.6rem;
  font-size: 0.9rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  cursor: default;
  outline: none;
  color: ${({ theme }) => theme.colors.slate[900]};
  transition: all ease 0.25s;

  &[data-hovered] {
    background: ${({ theme }) => theme.colors.slate[100]};
    color: ${({ theme }) => theme.colors.slate[900]};
  }

  &[data-focused] {
    background: ${({ theme }) => theme.colors.slate[100]};
    color: ${({ theme }) => theme.colors.slate[900]};
  }

  &[data-pressed] {
    background: ${({ theme }) => theme.colors.slate[200]};
    color: ${({ theme }) => theme.colors.slate[900]};
  }

  &[data-selected] {
    background: none;
    color: ${({ theme }) => theme.colors.slate[900]};
    font-weight: 600;

    &[data-focused] {
      background: ${({ theme }) => theme.colors.slate[100]};
    }
  }

  &[data-disabled] {
    background: none;
    color: ${({ theme }) => theme.colors.slate[500]};
  }
`;

export default StyledPopover;
