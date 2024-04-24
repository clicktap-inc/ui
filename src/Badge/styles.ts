import styled from 'styled-components';
import { Badge as NextUIBadge } from '@nextui-org/badge';
import { BadgeProps, BadgeWrapperProps } from './types';

export const Root = styled.div`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
`;

export const BadgeWrapper = styled.div<BadgeWrapperProps>`
  position: absolute;
  z-index: 2;

  transform: ${({ placement }) => {
    const variants = {
      'top-right': `translate(50%, -50%)`,
      'bottom-right': `translate(50%, 50%)`,
      'bottom-left': `translate(-50%, 50%)`,
      'top-left': `translate(-50%, -50%)`,
    };

    if (placement && variants[placement]) {
      return variants[placement];
    }
    return variants['top-right'];
  }};

  ${({ placement, shape }) => {
    const shapeVariants = {
      rectangle: '5%',
      circle: '10%',
    };
    let shapePosition = shapeVariants.rectangle;

    if (shape && shapeVariants[shape]) {
      shapePosition = shapeVariants[shape];
    }

    const variants = {
      'top-right': {
        top: shapePosition,
        right: shapePosition,
      },
      'bottom-right': {
        bottom: shapePosition,
        right: shapePosition,
      },
      'top-left': {
        top: shapePosition,
        left: shapePosition,
      },
      'bottom-left': {
        bottom: shapePosition,
        left: shapePosition,
      },
    };

    if (placement && variants[placement]) {
      return variants[placement];
    }

    return variants['top-right'];
  }};
`;

export const StyledBadge = styled(NextUIBadge)<BadgeProps>`
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  z-index: 10;
  box-sizing: border-box;
  border-radius: 9999px;
  padding: 0 0.25rem;
  font-weight: 400;
  user-select: none;
  color: ${({ theme }) => theme.colors.slate[900]};
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  white-space: nowrap;

  ${({ size, content, isOneChar: propsIsOneChar, isDot }) => {
    const variants = {
      sm: '1rem',
      md: '1.25rem',
      lg: '1.5rem;',
    };

    const isOneChar = String(content)?.length === 1 || propsIsOneChar;

    let variant = variants.md;
    if (size && variants[size]) {
      variant = variants[size];
    }

    if (!content || isDot) {
      return 'width: 0.875rem; height: 0.875rem;';
    }

    return isOneChar
      ? `width: ${variant}; height: ${variant};`
      : `min-width: ${variant}; height: ${variant};`;
  }}

  font-size: ${({ size, content, isDot }) => {
    const variants = {
      sm: '0.75rem',
      md: '0.875rem',
      lg: '0.875rem',
    };

    if ((typeof content === 'string' && content.length > 1) || isDot) {
      return variants.sm;
    }

    let variant = variants.md;
    if (size && variants[size]) {
      variant = variants[size];
    }

    return variant;
  }};

  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'flat':
        return `color-mix(
          in srgb,
          ${theme.colors?.slate?.[800]},
          transparent 45%
        )`;
      case 'faded':
        return `${theme.colors?.white}`;
      case 'solid':
      case 'shadow':
      default:
        return `${theme.colors?.slate?.[800]}`;
    }
  }};

  color: ${({ variant, theme }) =>
    variant === 'faded'
      ? `${theme.colors?.slate?.[800]}`
      : `${theme.colors?.white}`};

  border: ${({ showOutline, variant, theme }) => {
    if (variant === 'faded') {
      return `2px solid ${theme.colors?.slate?.[800]}`;
    }
    return showOutline ? `2px solid ${theme.colors.white}` : 'none';
  }};

  box-shadow: ${({ variant, theme }) => {
    if (variant === 'shadow') {
      return `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      color-mix(
          in srgb,
          ${theme.colors?.slate?.[800]},
          transparent 60%
        )
        0px 10px 15px -3px,
      color-mix(
          in srgb,
          ${theme.colors?.slate?.[800]},
          transparent 60%
        )
        0px 4px 6px -4px`;
    }
    return 'none';
  }};
`;
