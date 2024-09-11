import {
  ComboBoxRenderProps,
  ListBox,
  ComboBox,
  Label,
  Input,
  Button,
  Text,
  FieldError,
  Popover,
  type ComboBoxProps as AriaComboBoxProps,
  type ValidationResult,
} from 'react-aria-components';
import { Key, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import type { SlotsToClasses } from '../types';
import { cn } from '../utils';
import { Pulse } from '../Loader';

const MotionPopover = motion(Popover);

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
  popoverOffset?: number;
  popoverPortalContainer?: Element;
  classNames?: SlotsToClasses<
    | 'label'
    | 'name'
    | 'comboBoxContainer'
    | 'input'
    | 'loader'
    | 'arrowButton'
    | 'description'
    | 'errorMessage'
    | 'listContainer'
    | 'list'
  >;
}

function ButtonIconSlot({
  buttonIcon,
  ...props
}: ComboBoxRenderProps & Pick<CustomSelectSlots, 'buttonIcon'>) {
  if (!buttonIcon) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'transition-all ease-in-out duration-200',
          props.isOpen ? 'rotate-180' : 'rotate-0'
        )}
      >
        <path
          d="M6 9L12 15L18 9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn([
            'stroke-slate-900',
            props.isDisabled && 'stroke-slate-400',
            props.isInvalid && 'stroke-red-500',
          ])}
        />
      </svg>
    );
  }

  return typeof buttonIcon === 'function' ? buttonIcon(props) : buttonIcon;
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
  popoverPortalContainer,
  popoverOffset,
  selectedKey,
  className,
  classNames,
  ...props
}: SelectProps<T>) {
  const [animation, setAnimation] =
    useState<ComboBoxPopoverAnimationState>('unmounted');
  const [isComboOpen, setIsComboOpen] = useState<boolean>(false);

  return (
    <ComboBox
      onOpenChange={() => {
        setAnimation(animation === 'visible' ? 'hidden' : 'visible');
        setIsComboOpen(!isComboOpen);
      }}
      isDisabled={props.isDisabled || isLoading}
      data-has-value={!!selectedKey}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={cn('flex flex-col', 'w-full', className)}
    >
      {(renderProps) => (
        <>
          <Label
            className={cn('flex', 'text-xs text-slate-500', classNames?.label)}
          >
            {label}
          </Label>
          <div
            className={cn(
              'flex',
              'relative',
              'w-full',
              classNames?.comboBoxContainer
            )}
          >
            <Input
              placeholder={placeholder}
              className={cn(
                'border border-solid border-slate-300',
                'text-sm text-slate-900',
                'py-0 px-2',
                'h-10 w-full',
                'm-0',
                'rounded-md',
                'bg-white',
                'transition-all ease-in-out duration-200',
                'data-[hovered]:border-slate-400',
                'data-[focused]:border-slate-400 data-[focused]:outline data-[focused]:outline-2 data-[focused]:outline-slate-200',
                ' data-[disabled]:bg-slate-100 data-[disabled]:border-slate-300',
                isLoading
                  ? 'data-[disabled]:text-slate-900'
                  : 'data-[disabled]:text-slate-500',
                'data-[invalid]:border-red-500 data-[invalid]:bg-red-100 data-[invalid]:text-red-600',
                'data-[invalid]:data-[hovered]:border-red-600',
                'data-[invalid]:data-[focused]:border-red-600 data-[invalid]:data-[focused]:outline data-[invalid]:data-[focused]:outline-2 data-[invalid]:data-[focused]:outline-red-200',
                'data-[invalid]:placeholder:text-slate-400',
                classNames?.input
              )}
            />
            {isLoading ? (
              <div
                className={cn(
                  'absolute top-2 right-2',
                  'block',
                  classNames?.loader
                )}
              >
                {slots?.loadingIcon || <Pulse />}
              </div>
            ) : (
              <Button
                className={cn(
                  'absolute top-2 right-0',
                  'block',
                  'border-none',
                  'bg-none',
                  classNames?.arrowButton
                )}
              >
                <ButtonIconSlot
                  buttonIcon={slots?.buttonIcon}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...renderProps}
                />
              </Button>
            )}
          </div>
          {description && (
            <Text
              slot="description"
              className={cn(
                'flex',
                'text-xs',
                'text-slate-500',
                classNames?.description
              )}
            >
              {description}
            </Text>
          )}
          <FieldError
            className={cn(
              'flex',
              'text-xs',
              'text-red-500',
              classNames?.errorMessage
            )}
          >
            {errorMessage}
          </FieldError>
          <MotionPopover
            key={key}
            isOpen={isComboOpen}
            isExiting={animation === 'hidden'}
            offset={popoverOffset}
            UNSTABLE_portalContainer={popoverPortalContainer}
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
            className={cn(
              'px-0 py-1.5',
              'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
              'rounded-md',
              'w-[var(--trigger-width)]',
              'bg-white',
              'border border-solid border-slate-300',
              classNames?.listContainer
            )}
          >
            <ListBox
              className={cn('max-h-80', 'overflow-y-scroll', classNames?.list)}
            >
              {children}
            </ListBox>
          </MotionPopover>
        </>
      )}
    </ComboBox>
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
  popoverOffset: undefined,
  popoverPortalContainer: undefined,
  classNames: undefined,
};

export default Select;
