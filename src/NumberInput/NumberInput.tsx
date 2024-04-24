import { ReactNode } from 'react';
import type { NumberFieldProps, ValidationResult } from 'react-aria-components';
import {
  StyledLabel,
  StyledInput,
  StyledFieldError,
  StyledText,
} from '../Input/styles';
import { StyledGroup, StyledNumberField } from './styles';
import { StyledButton } from '../Button/styles';

interface NumberInputProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  slots?: {
    decrementIcon?: ReactNode;
    incrementIcon?: ReactNode;
  };
}

const DecrementIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IncrementIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function NumberInput({
  label,
  description,
  errorMessage,
  isInvalid,
  isReadOnly,
  slots,
  ...props
}: NumberInputProps) {
  return (
    <StyledNumberField
      isInvalid={isInvalid}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>

      <StyledGroup isInvalid={isInvalid} aria-readonly={isReadOnly}>
        <StyledButton variant="outline" slot="decrement">
          {slots?.decrementIcon}
        </StyledButton>

        <StyledInput readOnly={isReadOnly} />

        <StyledButton variant="outline" slot="increment">
          {slots?.incrementIcon}
        </StyledButton>
      </StyledGroup>

      {description && <StyledText slot="description">{description}</StyledText>}

      <StyledFieldError>{errorMessage}</StyledFieldError>
    </StyledNumberField>
  );
}

NumberInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  slots: {
    decrementIcon: DecrementIcon,
    incrementIcon: IncrementIcon,
  },
};

export default NumberInput;
