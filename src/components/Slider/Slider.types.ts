import type { SliderProps as AriaSliderProps } from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export type SliderProps = AriaSliderProps & {
  label?: string;
  showOutput?: boolean;
  thumbLabels?: string[];
  classNames?: SlotsToClasses<
    'base' | 'label' | 'output' | 'outputWrapper' | 'track' | 'thumb'
  >;
};
