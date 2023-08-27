import rgba from 'color-alpha';
import { css } from 'styled-components';
import { effects } from '../effects/effects.styles';
import { styled, defaultTheme } from '../theming/theming';
import { ButtonProps } from './button.props';

export const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => {
    // eslint-disable-next-line no-nested-ternary
    return props.variant === 'solid'
      ? Object.keys(props.theme).length === 0
        ? defaultTheme.colors.primary
        : props.theme.components?.button?.primary?.backgroundColor
      : 'transparent';
  }};
  color: ${(props) => {
    switch (props.variant) {
      case 'solid':
        return Object.keys(props.theme).length === 0
          ? defaultTheme.colors.white
          : props.theme.colors?.white;
      case 'outline':
      case 'ghost':
      case 'link':
      default:
        return Object.keys(props.theme).length === 0
          ? defaultTheme.colors.primary
          : props.theme.components?.button?.primary?.color;
    }
  }};
  border-width: 1px;
  border-color: ${(props) => {
    switch (props.variant) {
      case 'solid':
      case 'outline':
        return Object.keys(props.theme).length === 0
          ? defaultTheme.colors.primary
          : props.theme.components?.button?.primary?.backgroundColor;
      case 'ghost':
      case 'link':
      default:
        return 'transparent';
    }
  }};
  border-style: solid;
  padding: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '0 1rem';
      case 'lg':
        return '0 2.5rem';
      case 'md':
      default:
        return '0 1.5rem';
    }
  }};
  border-radius: ${(props) => {
    switch (props.shape) {
      case 'square':
        return '0px';
      case 'round':
        switch (props.size) {
          case 'sm':
            return Object.keys(props.theme).length === 0
              ? defaultTheme.height[12]
              : props.theme?.height?.[12];
          case 'lg':
            return Object.keys(props.theme).length === 0
              ? defaultTheme.height[24]
              : props.theme?.height?.[24];
          case 'md':
          default:
            return Object.keys(props.theme).length === 0
              ? defaultTheme.height[16]
              : props.theme.height?.[16];
        }
      case 'default':
      default:
        return '0.25rem';
    }
  }};
  cursor: pointer;
  height: ${(props) => {
    switch (props.size) {
      case 'sm':
        return Object.keys(props.theme).length === 0
          ? defaultTheme.height[6]
          : props.theme.height?.[6];
      case 'lg':
        return Object.keys(props.theme).length === 0
          ? defaultTheme.height[12]
          : props.theme.height?.[12];
      case 'md':
      default:
        return Object.keys(props.theme).length === 0
          ? defaultTheme.height[8]
          : props.theme.height?.[8];
    }
  }};
  font-size: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '0.875rem';
      case 'lg':
        return '1.125rem';
      case 'md':
      default:
        return '1rem';
    }
  }};
  display: flex;
  align-items: center;

  &:hover:not(:disabled) {
    ${(props) => {
      switch (props.variant) {
        case 'solid':
          return css`
            background-image: linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.1) 100%
            );
          `;
        case 'outline':
        case 'ghost':
          return css`
            background-color: ${rgba(
              props.theme.components?.button?.primary?.color ??
                defaultTheme.colors.primary,
              0.1
            )};
          `;
        case 'link':
        default:
          return '';
      }
    }}
  }

  ${(props) => props.disabled && `opacity: 0.5; cursor: auto;`}
  ${(props) => effects(props)}
`;

export default {
  StyledButton,
};
