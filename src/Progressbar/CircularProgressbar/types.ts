import type { ProgressBarProps } from 'react-aria-components';

export interface CircularProgressbarProps extends ProgressBarProps {
  label?: string;
  showValue?: boolean;
  size?: number;
  strokeWidth?: number;
}
