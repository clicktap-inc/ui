// import { css } from 'styled-components';
// import { spacing } from '../spacing/spacing.styles';
import styled, { css } from 'styled-components';
import { effects } from '../effects/effects.styles';
import { FlexItemProps, FlexProps } from './flex.props';
import { spacing } from '../spacing/spacing.styles';
import { typography } from '../typography/typography.styles';

export const StyledFlex = styled.div<FlexProps>`
  ${(props) =>
    props.alignContent &&
    css`
      align-content: ${props.alignContent};
    `}

  ${(props) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}

  ${(props) =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}

  ${(props) =>
    props.display &&
    css`
      display: ${props.display};
    `}

  ${(props) =>
    props.flow &&
    css`
      flex-flow: ${props.flow};
    `}

  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap};
    `}
  ${(props) =>
    props.gapx &&
    css`
      column-gap: ${props.gapx};
    `}
  ${(props) =>
    props.gapy &&
    css`
      row-gap: ${props.gapy};
    `}

  ${(props) =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `}

  ${(props) =>
    props.wrap &&
    css`
      flex-wrap: ${props.wrap};
    `}

  ${(props) =>
    props.alignSelf &&
    css`
      align-self: ${props.alignSelf};
    `}

  ${(props) => {
    if (!props.flex) return null;
    switch (props.flex) {
      case '1':
        return `flex: 1 1 0%;`;
      case 'auto':
        return `flex: 1 1 auto;`;
      case 'initial':
        return `flex: 0 1 auto;`;
      case 'none':
        return `flex: none;`;
      default:
        return css`
          flex: ${props.flex};
        `;
    }
  }}

  ${(props) => {
    if (!props.basis) return null;
    switch (props.basis) {
      case 'auto':
        return `flex-basis: auto;`;
      case 'full':
        return `flex-basis: 100%;`;
      default:
        return css`
          flex-basis: ${props.basis};
        `;
    }
  }}

  ${(props) =>
    props.grow &&
    css`
      flex-grow: ${props.grow};
    `}

  ${(props) =>
    props.basis &&
    css`
      flex-shrink: ${props.shrink};
    `}

  ${(props) => {
    if (!props.order) return null;
    switch (props.order) {
      case 'first':
        return `order: -9999;`;
      case 'last':
        return `order: 9999;`;
      case 'none':
        return `order: 0;`;
      default:
        return css`
          order: ${props.order};
        `;
    }
  }}

  ${(props) => effects(props)}
  ${(props) => spacing(props)}
  ${(props) => typography(props)}
`;

export const StyledFlexItem = styled.div<FlexItemProps>`
  ${(props) =>
    props.alignSelf &&
    css`
      align-self: ${props.alignSelf};
    `}

  ${(props) => {
    if (!props.flex) return null;
    switch (props.flex) {
      case '1':
        return `flex: 1 1 0%;`;
      case 'auto':
        return `flex: 1 1 auto;`;
      case 'initial':
        return `flex: 0 1 auto;`;
      case 'none':
        return `flex: none;`;
      default:
        return css`
          flex: ${props.flex};
        `;
    }
  }}

  ${(props) => {
    if (!props.basis) return null;
    switch (props.basis) {
      case 'auto':
        return `flex-basis: auto;`;
      case 'full':
        return `flex-basis: 100%;`;
      default:
        return css`
          flex-basis: ${props.basis};
        `;
    }
  }}

  ${(props) =>
    props.grow &&
    css`
      flex-grow: ${props.grow};
    `}

  ${(props) =>
    props.basis &&
    css`
      flex-shrink: ${props.shrink};
    `}

  ${(props) => {
    if (!props.order) return null;
    switch (props.order) {
      case 'first':
        return `order: -9999;`;
      case 'last':
        return `order: 9999;`;
      case 'none':
        return `order: 0;`;
      default:
        return css`
          order: ${props.order};
        `;
    }
  }}

  ${(props) => effects(props)}
  ${(props) => spacing(props)}
`;

export default StyledFlex;
