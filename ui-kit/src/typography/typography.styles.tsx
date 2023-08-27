import { css } from 'styled-components';
import { TypographyProps } from './typography.props';

function cssTextOverflow(value: string) {
  switch (value) {
    case 'ellipsis':
      return `text-overflow: ellipsis;`;
    case 'clip':
      return `text-overflow: clip;`;
    case 'truncate':
    default:
      return `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`;
  }
}

function cssBreak(value: string) {
  switch (value) {
    case 'words':
      return `overflow-wrap: break-word;`;
    case 'all':
      return `word-break: break-all;`;
    case 'normal':
    default:
      return `overflow-wrap: normal; word-break: normal;`;
  }
}

export function typography(props: TypographyProps) {
  return css`
    ${props.fontFamily && `font-family: ${props.fontFamily};`}
    ${props.fontSize && `font-size: ${props.fontSize};`}
    ${props.fontSmoothing && props.fontSmoothing === 'antialiased'
      ? `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
      : `-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto;`}
    ${props.fontStyle && props.fontStyle === 'italic'
      ? `font-style: italic;`
      : `font-style: normal;`}
    ${props.fontWeight && `font-weight: ${props.fontWeight};`}
    ${props.fontVariantNumeric &&
    `font-variant-numeric: ${props.fontVariantNumeric};`}
    ${props.letterSpacing && `letter-spacing: ${props.letterSpacing};`}
    ${props.lineHeight && `line-height: ${props.lineHeight};`}
    ${props.listStyleType && `list-style-type: ${props.listStyleType};`}
    ${props.listStylePosition &&
    `list-style-position: ${props.listStylePosition};`}
    ${props.textAlign && `text-align: ${props.textAlign};`}
    ${props.textColor && `color: ${props.textColor};`}
    ${props.textDecoration && `text-decoration-line: ${props.textDecoration};`}
    ${props.textDecorationColor &&
    `text-decoration-color: ${props.textDecorationColor};`}
    ${props.textDecorationStyle &&
    `text-decoration-style: ${props.textDecorationStyle};`}
    ${props.textDecorationThickness &&
    `text-decoration-thickness: ${props.textDecorationThickness};`}
    ${props.textUnderlineOffset &&
    `text-underline-offset: ${props.textUnderlineOffset};`}
    ${props.textTransform && `text-transform: ${props.textTransform};`}
    ${props.textOverflow && cssTextOverflow(props.textOverflow)}
    ${props.textIndent && `text-indent: ${props.textIndent};`}
    ${props.verticalAlign && `vertical-align: ${props.verticalAlign};`}
    ${props.whitespace && `white-space: ${props.whitespace};`}
    ${props.break && cssBreak(props.break)}
  `;
}

export default typography;
