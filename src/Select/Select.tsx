import {
  ComboBoxRenderProps,
  ListBox,
  type ComboBoxProps as AriaComboBoxProps,
  type ValidationResult,
} from 'react-aria-components';
import { Key, ReactNode, useState } from 'react';
import {
  ComboBoxContainer,
  StyledButton,
  StyledButtonIcon,
  StyledComboBox,
  StyledFieldError,
  StyledInput,
  StyledLabel,
  StyledLoader,
  StyledPopover,
  StyledText,
} from './styles';
import { Pulse } from '../Loader';

export type ComboBoxPopoverAnimationState = 'unmounted' | 'hidden' | 'visible';

type CustomSelectSlots = {
  buttonIcon?: ReactNode | ((values: ComboBoxRenderProps) => ReactNode);
  loadingIcon?: ReactNode;
};

export interface SelectProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  key?: Key | null;
  isLoading?: boolean;
  children: ReactNode | ((item: T) => ReactNode);
  slots?: CustomSelectSlots;
}

function ButtonIconSlot({
  buttonIcon,
  ...rest
}: ComboBoxRenderProps & Pick<CustomSelectSlots, 'buttonIcon'>) {
  if (!buttonIcon) {
    return (
      <StyledButtonIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        isOpen={rest.isOpen}
        isDisabled={rest.isDisabled}
        isInvalid={rest.isInvalid}
      >
        <path
          d="M6 9L12 15L18 9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </StyledButtonIcon>
    );
  }
  return typeof buttonIcon === 'function' ? buttonIcon(rest) : buttonIcon;
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  key,
  isLoading,
  slots,
  ...props
}: SelectProps<T>) {
  const [animation, setAnimation] =
    useState<ComboBoxPopoverAnimationState>('unmounted');
  const [isComboOpen, setIsComboOpen] = useState<boolean>(false);

  return (
    <StyledComboBox
      onOpenChange={() => {
        setAnimation(animation === 'visible' ? 'hidden' : 'visible');
        setIsComboOpen(!isComboOpen);
      }}
      isDisabled={props.isDisabled || isLoading}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {(renderProps) => (
        <>
          <StyledLabel>{label}</StyledLabel>
          <ComboBoxContainer>
            <StyledInput
              placeholder={placeholder}
              isLoading={isLoading ?? false}
            />
            {isLoading ? (
              <StyledLoader>{slots?.loadingIcon || <Pulse />}</StyledLoader>
            ) : (
              <StyledButton>
                <ButtonIconSlot
                  buttonIcon={slots?.buttonIcon}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...renderProps}
                />
              </StyledButton>
            )}
          </ComboBoxContainer>
          {description && (
            <StyledText slot="description">{description}</StyledText>
          )}
          <StyledFieldError>{errorMessage}</StyledFieldError>
          <StyledPopover
            key={key}
            isOpen={isComboOpen}
            isExiting={animation === 'hidden'}
            onAnimationComplete={(completedAnimation: string) => {
              setAnimation((a) =>
                completedAnimation === 'hidden' && a === 'hidden'
                  ? 'unmounted'
                  : a
              );
            }}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={animation}
          >
            {/** Cannot use styled components due to "children" prop definition incl generics */}
            <ListBox style={{ maxHeight: '20rem', overflowY: 'scroll' }}>
              {children}
            </ListBox>
          </StyledPopover>
        </>
      )}
    </StyledComboBox>
  );
}

Select.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  placeholder: '',
  key: undefined,
  isLoading: false,
  slots: {
    loadingIcon: undefined,
    buttonIcon: undefined,
  },
};

export default Select;
