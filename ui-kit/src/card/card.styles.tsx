import { styled } from '../theming/theming';

// import { css, ThemeConsumer } from 'styled-components';
// import { /* defaultTheme, */ styled /* Theme */ } from '../theming/theming';
// import palette from '../palette/palette';
import {
  CardProps,
  CardHeaderProps,
  CardMediaProps,
  // CardContentProps,
  // CardFooterProps,
} from './card.props';
// import { padding } from '../spacing/spacing.styles';

// const getTheme = (themeOverride: Theme) =>
//   Object.keys(themeOverride).length > 0 ? themeOverride : defaultTheme;

// export const StyledCardContent = styled.div<CardContentProps>`
//   background-color: ${({ background, theme }) =>
//     palette(getTheme(theme), background || 'white')};

//   ${({ theme }) => css`
//     ${padding({
//       px: getTheme(theme).spacing[4],
//       py: getTheme(theme).spacing[5],
//     })}

//     @media (min-width: ${getTheme(theme).screens.sm}) {
//       ${padding({ p: getTheme(theme).spacing[6] })}
//     }
//   `}

//   ${({ css: cssOverride }) => cssOverride};
// `;

// export const StyledCardHeader = styled.div<CardHeaderProps>`
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => getTheme(theme).height[4]};
//   background-color: ${({ background, theme }) =>
//     palette(getTheme(theme), background || 'white')};

//   ${({ theme }) => css`
//     ${padding({
//       px: getTheme(theme).spacing[4],
//       py: getTheme(theme).spacing[5],
//     })}

//     @media (min-width: ${getTheme(theme).screens.sm}) {
//       ${padding({ p: getTheme(theme).spacing[6] })}
//     }
//   `}

//   ${({ css: cssOverride }) => cssOverride};
// `;

/** @todo how to handle px, py, etc. gracefully? */
/** @todo how to handle screens (and other utilities) gracefully? */
export const StyledCardContent = styled.div`
  background-color: ${({ theme }) =>
    theme.components?.Card?.backgroundColor ?? theme.colors?.transparent};
  padding: ${({ theme }) => theme.components?.['Card.Content']?.padding};
  font-size: ${({ theme }) =>
    theme.components?.['Card.Content']?.fontSize ?? '0.9rem'};
`;

export const StyledCardHeader = styled.div<CardHeaderProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.[4]};
  background-color: ${({ theme }) => theme.colors?.white};
  font-size: ${({ theme }) =>
    theme.components?.['Card.Header']?.fontSize ?? '1.125rem'};
  font-weight: ${({ theme }) =>
    theme.components?.['Card.Header']?.fontWeight ?? '700'};
  margin-bottom: ${({ theme }) =>
    theme.components?.['Card.Header']?.marginBottom ?? '1rem'};
`;

export const StyledCardTitleFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledCardTitle = styled.div<CardHeaderProps>`
  color: ${({ theme }) => theme.colors?.black};
`;

export const StyledCardSubtitle = styled.div<CardHeaderProps>`
  color: ${({ theme }) => theme.colors?.gray?.[500]};
`;

export const StyledCardIcon = styled.div<CardHeaderProps>`
  flex-shrink: 0;
`;

export const StyledCardAvatar = styled.div<CardHeaderProps>`
  flex-shrink: 0;
`;

export const StyledCardActions = styled.div<CardHeaderProps>`
  flex-shrink: 0;
`;

// export const StyledCardFooter = styled.div<CardFooterProps>`
//   background-color: ${({ background, theme }) =>
//     palette(getTheme(theme), background || 'white')};

//   ${({ theme }) => css`
//     ${padding({
//       px: getTheme(theme).spacing[4],
//       py: getTheme(theme).spacing[5],
//     })}

//     @media (min-width: ${getTheme(theme).screens.sm}) {
//       ${padding({ p: getTheme(theme).spacing[6] })}
//     }
//   `}

//   ${({ css: cssOverride }) => cssOverride};
// `;

export const StyledCardFooter = styled.div`
  background-color: ${({ theme }) =>
    theme.components?.Card?.backgroundColor ?? theme.colors?.transparent};
`;

export const StyledCardMedia = styled.div<CardMediaProps>`
  position: relative;
  width: 100%;
  padding-bottom: ${({ aspectRatio = 16 / 9 }) =>
    `calc(100% / ${aspectRatio})`};
  background-color: ${({ theme }) => theme.colors?.slate?.[200]};

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  ${({ css: cssOverride }) => cssOverride};
`;

/** @todo do not print style if value is null or undefined */
export const StyledCard = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors?.white};
  font-family: ${({ theme }) => theme.fontFamily?.sans ?? 'sans-serif'};
  font-size: ${({ theme }) => theme.height?.[4]};
  line-height: ${({ theme }) => theme.height?.[6]};

  padding: ${({ theme }) =>
    theme.components?.Card?.padding ?? theme.height?.[4]};
  border-radius: ${({ theme }) =>
    theme.components?.Card?.borderRadius ?? theme.spacing?.[2]};
  border: ${({ theme }) => theme.components?.Card?.border};
  box-shadow: ${({ theme }) => theme.components?.Card?.boxShadow};

  ${({ css: cssOverride }) => cssOverride};
`;

export default {
  StyledCardContent,
  StyledCardHeader,
  StyledCardFooter,
  StyledCardMedia,
  StyledCard,
};
