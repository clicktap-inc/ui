import { css } from 'styled-components';
import { BoxShadowProps, EffectsProps } from './effects.props';

function boxShadow(props: BoxShadowProps) {
  const color = props.shadowColor ?? `rgb(0 0 0 / 0.1)`;

  switch (props.shadow) {
    case 'sm':
      return css`
        box-shadow: 0 1px 2px 0 ${color};
      `;
    case 'md':
      return css`
        box-shadow: 0 4px 6px -1px ${color}, 0 2px 4px -2px ${color};
      `;
    case 'lg':
      return css`
        box-shadow: 0 10px 15px -3px ${color}, 0 4px 6px -4px ${color};
      `;
    case 'xl':
      return css`
        box-shadow: 0 20px 25px -5px ${color}, 0 8px 10px -6px ${color};
      `;
    case '2xl':
      return css`
        box-shadow: 0 25px 50px -12px ${color};
      `;
    case 'inner':
      return css`
        box-shadow: inset 0 2px 4px 0 ${color};
      `;
    case 'none':
      return css`
        box-shadow: 0 0 #0000;
      `;
    default:
      return css`
        box-shadow: 0 1px 3px 0 ${color}, 0 1px 2px -1px ${color};
      `;
  }
}

export function effects(props: EffectsProps) {
  return css`
    ${props.shadow && boxShadow(props)}
    ${props.opacity && `opacity: ${0.01 * props.opacity};`};
    ${props.mixBlend && `mix-blend-mode: ${props.mixBlend}};`};
    ${props.bgBlend && `background-blend-mode: ${props.bgBlend}};`};
  `;
}

export default { boxShadow, effects };
