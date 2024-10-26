import type { MeterProps as AriaMeterProps } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export type MeterProps = AriaMeterProps & {
  label?: string;
  showValue?: boolean;
  classNames?: SlotsToClasses<
    'label' | 'value' | 'labelWrapper' | 'track' | 'trackWrapepr'
  >;
};
