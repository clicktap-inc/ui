import {
  CornerHint,
  ErrorText,
  HelperText,
  InputGroupWrap,
  InputWrap,
  LabelTopWrap,
  LeadingAddOn,
  ShortCut,
  StyledInput,
  StyledLabel,
  TrailingAddOn,
} from './input.styles';
import { InputProps } from './input.props';

export function Input({
  shape = 'round',
  variant = 'outlined',
  labelPosition = 'outside',
  state = 'idle',
  inputSize = 'sm',
  inputWidth = 'full',
  type = 'text',
  label,
  id,
  trailingAddOn,
  leadingAddOn,
  helperText,
  errorText,
  cornerHint,
  keyboardShortcut,
  ...rest
}: InputProps) {
  const renderLabelTopWrap = !!(
    (label && labelPosition === 'outside') ||
    cornerHint
  );

  return (
    <InputGroupWrap inputWidth={inputWidth}>
      {renderLabelTopWrap ? (
        <LabelTopWrap>
          {label && labelPosition === 'outside' ? (
            <StyledLabel htmlFor={id} labelPosition={labelPosition}>
              {label}
            </StyledLabel>
          ) : null}
          {cornerHint ? <CornerHint>{cornerHint}</CornerHint> : null}
        </LabelTopWrap>
      ) : null}

      <InputWrap
        shape={shape}
        variant={variant}
        state={state}
        inputSize={inputSize}
        labelPosition={labelPosition}
      >
        {label &&
        (labelPosition === 'inside' || labelPosition === 'overlap') ? (
          <StyledLabel htmlFor={id} labelPosition={labelPosition}>
            {label}
          </StyledLabel>
        ) : null}
        {leadingAddOn ? <LeadingAddOn>{leadingAddOn}</LeadingAddOn> : null}
        <StyledInput
          id={id}
          name={id}
          shape={shape}
          variant={variant}
          state={state}
          inputSize={inputSize}
          inputWidth={inputWidth}
          labelPosition={labelPosition}
          type={type}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
        {keyboardShortcut ? <ShortCut>{keyboardShortcut}</ShortCut> : null}
        {trailingAddOn ? <TrailingAddOn>{trailingAddOn}</TrailingAddOn> : null}
      </InputWrap>
      {state === 'error' && errorText ? (
        <ErrorText>{errorText}</ErrorText>
      ) : null}
      {helperText ? <HelperText>{helperText}</HelperText> : null}
    </InputGroupWrap>
  );
}

Input.defaultProps = {
  shape: 'round',
  variant: 'outlined',
  state: 'idle',
  inputSize: 'sm',
  labelPosition: 'outside',
  inputWidth: 'full',
};

export default Input;
