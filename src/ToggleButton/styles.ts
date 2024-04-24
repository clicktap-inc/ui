import styled from 'styled-components';
import { ToggleButton } from 'react-aria-components';
import { ToggleButtonProps } from './types';

export const Root = styled(ToggleButton)<ToggleButtonProps>`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  border-radius: 0.375rem;
  transition-duration: 0.3s;
  font-weight: 600;
  transition-property: background-color, color, border-color;
  padding: 0 1rem;
  height: 2.5rem;
  cursor: pointer;
  outline: none;
  border-style: solid;
  border-width: 1px;
  color: ${({ theme }) => theme.colors?.slate?.[900]};

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

  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'ghost':
      case 'outline':
        return 'transparent';
      case 'solid':
      default:
        return theme.colors?.slate?.[200];
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
        return theme.colors?.slate?.[200];
    }
  }};

  &[data-selected] {
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
        case 'solid':
        default:
          return theme.colors.slate[800];
      }
    }};
    color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
        case 'outline':
          return theme.colors.slate[700];
        case 'solid':
        default:
          return theme.colors.white;
      }
    }};
  }

  &[data-disabled] {
    cursor: default;

    background-color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
        case 'outline':
          return 'transparent';
        case 'solid':
        default:
          return theme.colors?.slate?.[100];
      }
    }};
    border-color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
          return 'transparent';
        case 'outline':
          return theme.colors.slate[200];
        case 'solid':
        default:
          return theme.colors.slate[100];
      }
    }};
    color: ${({ variant, theme }) => {
      switch (variant) {
        case 'ghost':
        case 'outline':
          return theme.colors.slate[500];
        case 'solid':
        default:
          return theme.colors.slate[400];
      }
    }};
  }
`;

export default Root;
