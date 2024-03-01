import type { ReactNode } from 'react';
import type { CSSProp } from 'styled-components';
import { EffectsProps } from '../effects/effects.props';
import { Theme } from '../theming/theming';

export interface ButtonProps extends EffectsProps {
  children: ReactNode /** @todo this should probably be more specific */;
  css?: CSSProp;
  disabled?: boolean;
  shape?: 'default' | 'round' | 'square';
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'pending' | 'success' | 'error';
  theme?: Theme | undefined;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
}

// export interface ButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement>,
//     EffectsProps {
//   children: ReactNode /** @todo this should probably be more specific */;
//   css?: CSSProp;
//   disabled?: boolean;
//   shape?: 'default' | 'round' | 'square';
//   size?: 'sm' | 'md' | 'lg';
//   state?: 'idle' | 'pending' | 'success' | 'error';
//   theme?: Theme | undefined;
//   variant?: 'solid' | 'outline' | 'ghost' | 'link';
// }

// export interface ButtonTextProps {
//   children: ReactNode;
// }
