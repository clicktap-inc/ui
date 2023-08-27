import type { InputHTMLAttributes, ReactNode } from 'react';
import type { CSSProp } from 'styled-components';
import { Theme } from '../theming/theming';

interface ISwitch extends InputHTMLAttributes<HTMLInputElement> {
  css?: CSSProp;
  theme?: Theme | undefined;
  label: ReactNode;
}

export type SwitchProps = Omit<ISwitch, 'type'>;
