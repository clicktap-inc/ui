import { css } from 'styled-components';
import { MarginProps, PaddingProps, SpacingProps } from './spacing.props';

export function margin(props: MarginProps | SpacingProps) {
  return css`
    ${props.m && `margin: ${props.m};`}
    ${props.mx && `margin-left: ${props.mx}; margin-right: ${props.mx};`}
    ${props.my && `margin-top: ${props.my}; margin-bottom: ${props.my};`}
    ${props.mt && `margin-top: ${props.mt};`}
    ${props.mr && `margin-right: ${props.mr};`}
    ${props.mb && `margin-bottom: ${props.mb};`}
    ${props.ml && `margin-left: ${props.ml};`}
  `;
}

export function padding(props: PaddingProps | SpacingProps) {
  return css`
    ${props.p && `padding: ${props.p};`}
    ${props.px && `padding-left: ${props.px}; padding-right: ${props.px};`}
    ${props.py && `padding-top: ${props.py}; padding-bottom: ${props.py};`}
    ${props.pt && `padding-top: ${props.pt};`}
    ${props.pr && `padding-right: ${props.pr};`}
    ${props.pb && `padding-bottom: ${props.pb};`}
    ${props.pl && `padding-left: ${props.pl};`}
  `;
}

export function spacing(props: (MarginProps & PaddingProps) | SpacingProps) {
  return css`
    ${props.m && `margin: ${props.m};`}
    ${props.mx && `margin-left: ${props.mx}; margin-right: ${props.mx};`}
    ${props.my && `margin-top: ${props.my}; margin-bottom: ${props.my};`}
    ${props.mt && `margin-top: ${props.mt};`}
    ${props.mr && `margin-right: ${props.mr};`}
    ${props.mb && `margin-bottom: ${props.mb};`}
    ${props.ml && `margin-left: ${props.ml};`}

    ${props.p && `padding: ${props.p};`}
    ${props.px && `padding-left: ${props.px}; padding-right: ${props.px};`}
    ${props.py && `padding-top: ${props.py}; padding-bottom: ${props.py};`}
    ${props.pt && `padding-top: ${props.pt};`}
    ${props.pr && `padding-right: ${props.pr};`}
    ${props.pb && `padding-bottom: ${props.pb};`}
    ${props.pl && `padding-left: ${props.pl};`}
  `;
}

export default spacing;
