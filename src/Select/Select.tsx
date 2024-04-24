import {
  ListBox,
  type ComboBoxProps as AriaComboBoxProps,
  type ValidationResult,
} from 'react-aria-components';
import {
  Dispatch,
  Key,
  SetStateAction,
  ReactNode,
  useState,
  useRef,
} from 'react';
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

interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  // animation?: ComboBoxPopoverAnimationState;
  placeholder?: string;
  key?: Key | null;
  // setAnimation?: Dispatch<SetStateAction<ComboBoxPopoverAnimationState>>;
  isLoading?: boolean;
  children: ReactNode | ((item: T) => ReactNode);
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  key,
  isLoading,
  // setAnimation,
  // animation = 'hidden',
  ...props
}: ComboBoxProps<T>) {
  const [animation, setAnimation] =
    useState<ComboBoxPopoverAnimationState>('unmounted');
  /** @todo there has to be a better way to do this */
  const comboBoxRef = useRef<HTMLDivElement>(null);
  // const [selectedKey, setSelectedKey] = useState<Key>(props.selectedKey ?? '');
  const [isComboOpen, setIsComboOpen] = useState<boolean>(false);

  return (
    <StyledComboBox
      ref={comboBoxRef}
      onOpenChange={() => {
        setAnimation(animation === 'visible' ? 'hidden' : 'visible');
        setIsComboOpen(!isComboOpen);
      }}
      isDisabled={props.isDisabled || isLoading}
      // selectedKey={selectedKey}
      // onSelectionChange={(k) => {
      //   console.log('selection change', k);

      //   if (props.onSelectionChange) {
      //     props.onSelectionChange(k);
      //   }

      //   if (typeof k === 'undefined' || k === null) {
      //     setSelectedKey('');
      //   } else {
      //     setSelectedKey(String(k));
      //   }
      // }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLabel>{label}</StyledLabel>
      <ComboBoxContainer>
        <StyledInput placeholder={placeholder} isLoading={isLoading ?? false} />
        {isLoading ? (
          /** @todo make this a customizable loader with a slot */
          <StyledLoader>
            <Pulse />
          </StyledLoader>
        ) : (
          <StyledButton>
            {/** @todo make this icon a customizable slot */}
            <StyledButtonIcon
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              isOpen={animation === 'visible' ?? false}
              isDisabled={Boolean(props.isDisabled)}
              isInvalid={Boolean(props.isInvalid)}
            >
              <path
                d="M6 9L12 15L18 9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </StyledButtonIcon>
          </StyledButton>
        )}
      </ComboBoxContainer>
      {description && <StyledText slot="description">{description}</StyledText>}
      <StyledFieldError>{errorMessage}</StyledFieldError>
      <StyledPopover
        key={key}
        isOpen={isComboOpen}
        style={{
          width: comboBoxRef.current
            ? comboBoxRef.current.getBoundingClientRect().width
            : '14rem',
        }}
        isExiting={animation === 'hidden'}
        onAnimationComplete={(completedAnimation: string) => {
          setAnimation((a) =>
            completedAnimation === 'hidden' && a === 'hidden' ? 'unmounted' : a
          );
        }}
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={animation}
        /** @todo popover should not close when scrolling window */
        // shouldCloseOnInteractOutside={(e: Element) => false}
        // eslint-disable-next-line react/jsx-props-no-spreading
        // {...props}
      >
        {/** Cannot use styled components due to "children" prop definition incl generics */}
        <ListBox style={{ maxHeight: '20rem', overflowY: 'scroll' }}>
          {children}
        </ListBox>
      </StyledPopover>
    </StyledComboBox>
  );
}

Select.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  // animation: 'unmounted',
  placeholder: '',
  key: undefined,
  // setAnimation: undefined,
  isLoading: false,
};

export default Select;
