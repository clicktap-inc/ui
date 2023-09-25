import styled, { css } from 'styled-components';
import { effects } from '../effects/effects.styles';
import { spacing } from '../spacing/spacing.styles';
import { typography } from '../typography/typography.styles';
import { GridItemProps, GridProps } from './grid.props';

export const StyledGrid = styled.div<GridProps>`
  ${(props) =>
    // order matters here, must happen before grid-template-* and grid-auto-*
    props.grid &&
    css`
      grid: ${props.grid};
    `}

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
    props.autoCols &&
    css`
      grid-auto-columns: ${props.autoCols};
    `}

  ${(props) =>
    props.autoFlow &&
    css`
      grid-auto-flow: ${props.autoFlow};
    `}

  ${(props) =>
    props.autoRows &&
    css`
      grid-auto-rows: ${props.autoRows};
    `}

  ${(props) =>
    props.cols === 'none'
      ? `grid-template-columns: none;`
      : css`
          grid-template-columns: repeat(${props.cols}, minmax(0, 1fr));
        `}

  ${(props) =>
    props.display &&
    css`
      display: ${props.display};
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
    props.justifyItems &&
    css`
      justify-items: ${props.justifyItems};
    `}

  ${(props) =>
    props.placeContent &&
    css`
      place-content: ${props.placeContent};
    `}

  ${(props) =>
    props.placeItems &&
    css`
      place-items: ${props.placeItems};
    `}

  ${(props) =>
    props.rows === 'none'
      ? `grid-template-rows: none;`
      : css`
          grid-template-rows: repeat(${props.rows}, minmax(0, 1fr));
        `}

  ${(props) =>
    props.template &&
    css`
      grid-template: ${props.template};
    `}

  ${(props) =>
    props.templateAreas &&
    css`
      grid-template-areas: ${props.templateAreas};
    `}

  ${(props) => {
    if (!props.templateCols) return null;
    switch (props.templateCols) {
      case 'none':
        return `grid-template-columns: none;`;
      /** @todo how to properly check is integer here including if passed as string */
      case Number.isInteger(props.templateCols) && props.templateCols:
        return css`
          grid-template-columns: repeat(${props.templateCols}, minmax(0, 1fr));
        `;
      default:
        return css`
          grid-template-columns: ${props.templateCols};
        `;
    }
  }}

  ${(props) => {
    if (!props.templateRows) return null;
    switch (props.templateRows) {
      case 'none':
        return `grid-template-rows: none;`;
      /** @todo how to properly check is integer here including if passed as string */
      case Number.isInteger(props.templateRows) && props.templateRows:
        return css`
          grid-template-rows: repeat(${props.templateRows}, minmax(0, 1fr));
        `;
      default:
        return css`
          grid-template-rows: ${props.templateRows};
        `;
    }
  }}

  ${(props) => effects(props)}
  ${(props) => spacing(props)}
  ${(props) => typography(props)}
`;

/** @todo should grid items be display: grid by default? */
export const StyledGridItem = styled.div<GridItemProps>`
  ${(props) =>
    props.alignSelf &&
    css`
      align-self: ${props.alignSelf};
    `}

  ${(props) => {
    if (!props.colSpan) return null;
    switch (props.colSpan) {
      case 'auto':
        return `grid-column: auto;`;
      case 'full':
        return `grid-column: 1 / -1;`;
      /** @todo how to properly check is integer here including if passed as string */
      case Number.isInteger(props.colSpan) && props.colSpan:
        return css`
          grid-column: span ${props.colSpan} / span ${props.colSpan};
        `;
      default:
        return css`
          grid-column: ${props.colSpan};
        `;
    }
  }}

  ${(props) =>
    // order matters here, must happen after grid-column
    props.colStart && props.colStart === 'auto'
      ? `grid-column-start: auto;`
      : css`
          grid-column-start: ${props.colStart};
        `}

  ${(props) =>
    // order matters here, must happen after grid-column
    props.colEnd && props.colEnd === 'auto'
      ? `grid-column-end: auto;`
      : css`
          grid-column-end: ${props.colEnd};
        `}

  ${(props) =>
    props.area &&
    css`
      grid-area: ${props.area};
    `}

  ${(props) =>
    props.justifySelf &&
    css`
      justify-self: ${props.justifySelf};
    `}

  ${(props) =>
    props.placeSelf &&
    css`
      place-self: ${props.placeSelf};
    `}

  ${(props) =>
    props.rowEnd && props.rowEnd === 'auto'
      ? `grid-row-end: auto;`
      : css`
          grid-row-end: ${props.rowEnd};
        `}

  ${(props) => {
    if (!props.rowSpan) return null;
    switch (props.rowSpan) {
      case 'auto':
        return `grid-row: auto;`;
      case 'full':
        return `grid-row: 1 / -1;`;
      /** @todo how to properly check is integer here including if passed as string */
      case Number.isInteger(props.rowSpan) && props.rowSpan:
        return css`
          grid-row: span ${props.rowSpan} / span ${props.rowSpan};
        `;
      default:
        return css`
          grid-row: ${props.rowSpan};
        `;
    }
  }}

  ${(props) =>
    props.rowStart === 'auto'
      ? `grid-row-start: auto;`
      : css`
          grid-row-start: ${props.rowStart};
        `}

  ${(props) => effects(props)}
  ${(props) => spacing(props)}
`;

export default StyledGrid;
