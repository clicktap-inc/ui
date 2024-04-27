import styled from 'styled-components';
import { Avatar } from '@nextui-org/avatar';
import { AvatarProps, RootProps } from './types';
import { defaultTheme } from '../defaultTheme';

export const Root = styled.div<RootProps>`
  z-index: 1;

  &:not(:first-child) {
    margin-inline-start: ${({ isInGroup, isGrid }) =>
      isGrid || !isInGroup ? 0 : '-0.5rem'};
  }

  &:hover {
    & > * {
      transform: ${({ isInGroup, isGrid }) =>
        !isGrid && isInGroup ? 'translateY(-0.8rem)' : 'none'};
    }
  }
`;

export const StyledAvatar = styled(Avatar)<AvatarProps>`
  background: ${({ theme }) =>
    theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: 0.25s transform ease;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};

  ${({ size }) => {
    const variants = {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
    };

    let variant = variants.md;
    if (size && variants[size]) {
      variant = variants[size];
    }

    return `width: ${variant}; height: ${variant}`;
  }};

  box-shadow: ${({ isBordered, theme }) =>
    isBordered
      ? `${
          theme?.colors?.white ?? defaultTheme.colors.white
        } 0px 0px 0px 2px, ${
          theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]
        } 0px 0px 0px 4px, rgba(0, 0, 0, 0) 0px 0px 0px 0px`
      : 'none'};

  border-radius: ${({ radius }) => {
    const variants = {
      full: '9999px',
      lg: '14px',
      md: '12px',
      sm: '8px',
      none: '0',
    };

    if (radius && variants[radius]) {
      return variants[radius];
    }

    return variants.full;
  }};

  img {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
    transition: 0.5s easy;
    transition-property: opacity;

    &[data-loaded='true'] {
      opacity: 1;
    }
  }

  span,
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.75rem;
    max-width: 100%;
    overflow: hidden;
    text-align: center;
  }
`;

export default Root;
