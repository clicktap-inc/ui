import type { SliderProps as AriaSliderProps } from 'react-aria-components';
import {
  StyledLabel,
  StyledSlider,
  StyledSliderOutput,
  StyledSliderTrack,
  StyledSliderThumb,
} from './styles';

interface SliderProps extends AriaSliderProps {
  label?: string;
  showOutput?: boolean;
  thumbLabels?: string[];
}

export function Slider({
  label,
  showOutput = true,
  thumbLabels,
  ...props
}: SliderProps) {
  return (
    <StyledSlider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>

      {showOutput && (
        <StyledSliderOutput>
          {({ state }) =>
            state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
          }
        </StyledSliderOutput>
      )}

      <StyledSliderTrack>
        {({ state }) =>
          state.values.map((_, i) => (
            <StyledSliderThumb
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              index={i}
              aria-label={thumbLabels?.[i]}
            />
          ))
        }
      </StyledSliderTrack>
    </StyledSlider>
  );
}

Slider.defaultProps = {
  label: undefined,
  showOutput: true,
  thumbLabels: undefined,
};

export default Slider;
