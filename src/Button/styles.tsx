import styled from 'styled-components';
import { Button } from 'react-aria-components';
import { ButtonProps } from './types';

export const StyledButton = styled(Button)<ButtonProps>`
  display: flex;
  align-items: center;
  padding: 0.4rem 2rem;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1;
  border-radius: 0.375rem;
  border-style: solid;
  border-width: 1px;
  justify-content: center;
  transition: all ease 200ms;
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '2rem';
      case 'lg':
        return '3rem';
      case 'md':
      default:
        return '2.5rem';
    }
  }};
  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case 'ghost':
      case 'outline':
        return 'transparent';
      case 'solid':
      default:
        return theme.colors?.slate?.[800];
    }
  }};
  border-color: ${({ variant, theme }) => {
    switch (variant) {
      case 'ghost':
        return 'transparent';
      case 'outline':
        return theme.colors?.slate?.[300];
      case 'solid':
      default:
        return theme.colors?.slate?.[800];
    }
  }};
  color: ${({ variant, theme }) => {
    switch (variant) {
      case 'ghost':
      case 'outline':
        return theme.colors?.slate?.[900];
      case 'solid':
      default:
        return theme.colors?.white;
    }
  }};

  &[data-hovered] {
    background-color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
          return 'transparent';
        case 'outline':
          return 'transparent';
        case 'solid':
        default:
          return theme.colors?.slate?.[900];
      }
    }};
    border-color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
          return 'transparent';
        case 'outline':
          return theme.colors?.slate?.[400];
        case 'solid':
        default:
          return theme.colors?.slate?.[900];
      }
    }};
  }

  &[data-focused] {
    outline: 2px solid ${({ theme }) => theme.colors.slate[200]};
    background-color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
          return 'transparent';
        case 'outline':
          return 'transparent';
        case 'solid':
        default:
          return theme.colors?.slate?.[900];
      }
    }};
    border-color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
          return 'transparent';
        case 'outline':
          return theme.colors?.slate?.[400];
        case 'solid':
        default:
          return theme.colors?.slate?.[900];
      }
    }};
  }

  &[data-pressed] {
    transform: scale(0.98);
  }

  &[data-disabled] {
    background-color: ${({ isLoading, theme, variant }) => {
      switch (variant) {
        case 'ghost':
        case 'outline':
          return 'transparent';
        case 'solid':
        default:
          return isLoading ? theme.colors.slate[900] : theme.colors.slate[100];
      }
    }};
    border-color: ${({ isLoading, theme, variant }) => {
      switch (variant) {
        case 'ghost':
          return 'transparent';
        case 'outline':
          return isLoading ? theme.colors.slate[300] : theme.colors.slate[200];
        case 'solid':
        default:
          return isLoading ? theme.colors.slate[900] : theme.colors.slate[200];
      }
    }};
    color: ${({ isLoading, theme, variant }) => {
      switch (variant) {
        case 'ghost':
        case 'outline':
          return isLoading ? theme.colors.slate[900] : theme.colors.slate[500];
        case 'solid':
        default:
          return isLoading ? theme.colors.white : theme.colors.slate[400];
      }
    }};
  }
`;

export default StyledButton;
