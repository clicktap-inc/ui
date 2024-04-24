import {
  StyledTimeField,
  StyledTimeInput,
  StyledTimeSegment,
  StyledFieldError,
  StyledLabel,
  StyledText,
} from './styles';
import { TimeInputProps } from './types';

export function TimeInput({
  label,
  description,
  errorMessage,
  ...props
}: TimeInputProps) {
  return (
    <StyledTimeField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>
      <StyledTimeInput>
        {(segment) => <StyledTimeSegment segment={segment} />}
      </StyledTimeInput>
      <StyledText slot="description">{description}</StyledText>
      <StyledFieldError>{errorMessage}</StyledFieldError>
    </StyledTimeField>
  );
}

TimeInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
};

export default TimeInput;
