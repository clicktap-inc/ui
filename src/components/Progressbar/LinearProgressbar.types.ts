import type { ProgressBarProps } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface LinearProgressbarProps extends ProgressBarProps {
  label?: string;
  width?: string;
  showValue?: boolean;
  classNames?: SlotsToClasses<
    'label' | 'value' | 'labelWrapper' | 'track' | 'trackWrapper'
  >;
}
