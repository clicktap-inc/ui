import type { ReactNode } from 'react';
import type {
  RadioRenderProps,
  RadioProps as UiRadioProps,
} from 'react-aria-components';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export interface RadioSlots {
  control?: ReactNode | ((values: RadioRenderProps) => ReactNode);
}

export interface RadioProps extends UiRadioProps {
  children?: ReactNode | ((values: RadioRenderProps) => ReactNode);
  slots?: RadioSlots;
  classNames?: SlotsToClasses<'control'>;
}
