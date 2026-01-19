'use client';

import {
  ListBox,
  ComboBox,
  Label,
  Input,
  Button,
  Text,
  FieldError,
  Popover,
  UNSAFE_PortalProvider,
} from 'react-aria-components';
import type { ComboBoxRenderProps, ListBoxProps } from 'react-aria-components';
import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { cn } from '../../utils/cn';
import { Pulse } from '../Loader';
import type { SelectProps, SelectSlots } from './Select.types';

function ButtonIconSlot<T extends object>({
  buttonIcon,
  ...props
}: ComboBoxRenderProps & Pick<SelectSlots<T>, 'buttonIcon'>) {
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

function ListBoxSlot<T extends object>({
  listBoxComponent,
  children,
  ...props
}: ListBoxProps<T> & Pick<SelectSlots<T>, 'listBoxComponent'>) {
  const Component = listBoxComponent || ListBox;

  return (
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Component>
  );
}

// Internal component - necessary to preserve generics in children
// i.e. <Select items={[{id: 'test', value: 'test'}]}.../> won't reference "any"
function SelectInner<T extends object>(
  {
    label,
    description,
    errorMessage,
    children,
    placeholder,
    isLoading,
    slots,
    popoverPortalContainer,
    popoverOffset,
    selectedKey,
    className,
    classNames,
    autoComplete,
    ...props
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const popoverClassName = cn(
    'px-0 py-1.5',
    'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
    'rounded-md',
    'w-[var(--trigger-width)]',
    'bg-white',
    'border border-solid border-slate-300',
    classNames?.listContainer
  );

  const popoverContent = (
    <Popover offset={popoverOffset} className={popoverClassName}>
      <ListBoxSlot
        listBoxComponent={slots?.listBoxComponent}
        className={cn('max-h-80', 'overflow-y-scroll', classNames?.list)}
      >
        {children}
      </ListBoxSlot>
    </Popover>
  );

  return (
    <ComboBox
      isDisabled={props.isDisabled || isLoading}
      data-has-value={!!selectedKey}
      selectedKey={selectedKey}
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
              ref={ref}
              autoComplete={autoComplete}
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
          {popoverPortalContainer ? (
            <UNSAFE_PortalProvider getContainer={popoverPortalContainer}>
              {popoverContent}
            </UNSAFE_PortalProvider>
          ) : (
            popoverContent
          )}
        </>
      )}
    </ComboBox>
  );
}

// Type for the exported component that preserves generics
interface SelectComponent {
  <T extends object>(
    props: SelectProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
  ): JSX.Element;
}

// Create the forwarded component with proper typing
export const Select = forwardRef(SelectInner) as SelectComponent;

export default Select;

