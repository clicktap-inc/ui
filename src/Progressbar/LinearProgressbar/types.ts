import type { ProgressBarProps } from 'react-aria-components';

export interface LinearProgressbarProps extends ProgressBarProps {
  label?: string;
  width?: string;
  showValue?: boolean;
}
