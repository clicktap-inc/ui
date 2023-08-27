import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { Theme } from '../theming/theming';
import { SpacingProps } from '../spacing/spacing.props';

type LabelPosition = {
  labelPosition?: 'inside' | 'outside' | 'overlap';
};

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    LabelPosition {}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    LabelPosition,
    SpacingProps {
  shape?: 'round' | 'square';
  variant?: 'outlined' | 'filled' | 'standard';
  label?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  inputWidth?: 'auto' | 'full';
  state?: 'idle' | 'error' | 'success';
  errorText?: string | JSX.Element;
  leadingAddOn?: string | JSX.Element;
  trailingAddOn?: string | JSX.Element;
  helperText?: string | JSX.Element;
  cornerHint?: string | JSX.Element;
  keyboardShortcut?: string | JSX.Element;
  theme?: Theme | undefined;
  type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'tel' | 'url';
  id?: string;
}
