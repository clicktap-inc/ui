import { styled } from '../theming/theming';
import { AvatarProps } from './avatar.props';
import type { Theme } from '../theming/theming';

function getSize(size: AvatarProps['size']) {
  if (!size) return `width: 50px; height: 50px;`;

  return `width: 50px; height: 50px;`;
}

function getWidth(width: AvatarProps['width']) {
  if (!width) return null;
  return typeof width === 'number' ? `width: ${width}px;` : `width: ${width};`;
}

function getHeight(height: AvatarProps['height']) {
  if (!height) return null;
  return typeof height === 'number'
    ? `height: ${height}px;`
    : `height: ${height};`;
}

function getBorderRadius(variant: AvatarProps['variant']) {
  if (!variant) return null;
  switch (variant) {
    case 'rounded':
      return `border-radius: 3px;`;
    case 'square':
      return `border-radius: 0;`;
    case 'circular':
    default:
      return `border-radius: 50%;`;
  }
}

function getFontSize(theme: Theme, size: AvatarProps['size']) {
  if (!size || !Object.prototype.hasOwnProperty.call(theme.fontSize, size))
    return null;

  const fontSize = Object.keys(theme.fontSize ?? []).find(
    (key) => key === size
  );
  if (!fontSize) return null;

  return `font-size: ${fontSize[0]};`;
}

function getOverlayPosition(
  overlayX: AvatarProps['overlayX'],
  overlayY: AvatarProps['overlayY']
) {
  let left;
  let top;

  switch (overlayX) {
    case 'center':
      left = '50%';
      break;
    case 'left':
      left = '0';
      break;
    case 'right':
    default:
      left = '100%';
      break;
  }

  switch (overlayY) {
    case 'bottom':
      top = '100%';
      break;
    case 'center':
      top = '50%';
      break;
    case 'top':
    default:
      top = '0';
      break;
  }

  return `
    left: ${left};
    top: ${top};
    transform: translate(-${left}, -${top});
  `;
}

export const AvatarRoot = styled.div<AvatarProps>`
  position: relative;
  color: ${({ theme }) => theme.colors?.gray?.[300]};
  ${({ size }) => getSize(size)}
  ${({ width }) => getWidth(width)}
  ${({ height }) => getHeight(height)}
`;

export const AvatarText = styled.span<AvatarProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily?.sans?.join(', ')};
  color: ${({ theme }) => theme.colors?.white};
  background-color: ${({ theme }) => theme.colors?.gray?.[500]};

  ${({ variant }) => getBorderRadius(variant)}
  ${({ theme, size }) => getFontSize(theme, size)}
`;

export const AvatarOverlay = styled.div<AvatarProps>`
  position: absolute;
  z-index: 4;
  ${({ overlayX, overlayY }) => getOverlayPosition(overlayX, overlayY)}
`;

export const AvatarIcon = styled.div<AvatarProps>`
  position: absolute;
  width: 100 %;
  height: 100 %;
  overflow: hidden;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors?.gray?.[100]};
  ${({ variant }) => getBorderRadius(variant)}

  svg {
    display: block;
    max-width: 50%;
    max-height: 50%;
    width: 100%;
    height: 100%;
  }
`;

/** @todo why does this image have "variant" as a prop? should be parent? */
export const AvatarImage = styled.img<AvatarProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  object-fit: cover;
  object-position: center;
  ${({ variant }) => getBorderRadius(variant)}
`;

export default {
  AvatarRoot,
  AvatarIcon,
  AvatarText,
  AvatarOverlay,
};
