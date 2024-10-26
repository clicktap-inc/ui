import type { ProgressBarProps } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface CircularProgressbarProps extends ProgressBarProps {
  label?: string;
  showValue?: boolean;
  size?: number;
  strokeWidth?: number;
  classNames?: SlotsToClasses<'label' | 'base' | 'value'>;
}
