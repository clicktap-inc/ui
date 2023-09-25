import styled, { css } from 'styled-components';
import { palette } from '../palette/palette';
import { BadgeDotProps, BadgeProps } from './badge.props';

// const getTheme = (themeOverride: Theme) =>
//   Object.keys(themeOverride).length ? themeOverride : defaultTheme;

export const StyledBadge = styled.div.withConfig({
  // shouldForwardProp: (prop, defaultValidatorFn) =>
  //   ![
  //     'theme',
  //     'css',
  //     'bg',
  //     'color',
  //     'disabled',
  //     'shape',
  //     'size',
  //     'state',
  //   ].includes(prop) && defaultValidatorFn(prop),
})<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.height?.[2]};

  background: ${({ bg, theme }) => palette(theme, bg || 'gray-100')};
  color: ${({ color, theme }) => palette(theme, color || 'gray-800')};

  padding: ${({ size, theme }) => {
    switch (size) {
      case 'lg':
        return `0 ${theme.height?.[3.5] ?? 0}`;
      case 'md':
        return `0 ${theme.height?.[3] ?? 0}`;
      case 'sm':
      default:
        return `0 ${theme.height?.[2.5] ?? 0}`;
    }
  }};

  border-radius: ${({ shape, size, theme }) => {
    switch (shape) {
      case 'square':
        return 0;
      case 'round':
        return theme.height?.[1];
      case 'circle':
      default:
        switch (size) {
          case 'lg':
            return theme.height?.[3.5];
          case 'md':
            return theme.height?.[3];
          case 'sm':
          default:
            return theme.height?.[2.5];
        }
    }
  }};

  height: ${({ size, theme }) => {
    switch (size) {
      case 'lg':
        return theme.height?.[7];
      case 'md':
        return theme.height?.[6];
      case 'sm':
      default:
        return theme.height?.[5];
    }
  }};

  font-family: ${({ theme }) => theme.fontFamily?.sans?.join(', ')};

  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'lg':
        return theme.height?.[4];
      case 'md':
        return theme.height?.[3.5];
      case 'sm':
      default:
        return theme.height?.[3];
    }
  }};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: auto;
    `}

  ${({ css: cssOverride }) => cssOverride}
`;

export const StyledBadgeDot = styled.div.withConfig({
  // shouldForwardProp: (prop, defaultValidatorFn) =>
  //   !['theme', 'css', 'color'].includes(prop) && defaultValidatorFn(prop),
})<BadgeDotProps>`
  width: ${({ theme }) => theme.height?.[1.5]};
  height: ${({ theme }) => theme.height?.[1.5]};
  border-radius: 50%;
  background-color: ${({ color, theme }) =>
    palette(theme, color || 'gray-400')};

  ${({ css: cssOverride }) => cssOverride}
`;

export default {
  StyledBadge,
  StyledBadgeDot,
};
