import type { MeterProps as AriaMeterProps } from 'react-aria-components';

export interface MeterProps extends AriaMeterProps {
  label?: string;
  showValue?: boolean;
}
