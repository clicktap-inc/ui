'use client';

import { Radio as AriaRadio } from 'react-aria-components';
import type { RadioRenderProps } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { RadioProps, RadioSlots } from './Radio.types';

function ControlSlot({
  control,
  classNames,
  ...props
}: RadioRenderProps &
  Pick<RadioSlots, 'control'> &
  Pick<RadioProps, 'classNames'>) {
  if (!control) {
    return (
      <div
        data-hovered={props?.isHovered}
        data-focused={props?.isFocused}
        data-disabled={props?.isDisabled}
        data-invalid={props?.isInvalid}
        data-selected={props?.isSelected}
        data-pressed={props?.isPressed}
        className={cn(
          'flex items-center justify-center w-6 h-6  border-solid border border-slate-300 ransition-all duration-300 ease rounded-full',
          'data-[hovered="true"]:border-slate-400',
          'data-[focused="true"]:border-slate-400 data-[focused="true"]:outline-2 data-[focused="true"]:outline data-[focused="true"]:outline-slate-200',
          'data-[disabled="true"]:border-slate-200 data-[disabled="true"]:bg-slate-100',
          'data-[invalid="true"]:bg-red-100 data-[invalid="true"]:text-red-600 data-[invalid="true"]:border-red-500',
          'data-[invalid="true"]:data-[disabled="true"]:border-red-200 data-[invalid="true"]:data-[disabled="true"]:bg-red-100',
          'data-[invalid="true"]:data-[hovered="true"]:border-red-600',
          'data-[invalid="true"]:data-[focused="true"]:border-red-600 data-[invalid="true"]:data-[focused="true"]:outline-red-200',
          'data-[invalid="true"]:data-[selected="true"]:bg-red-100 data-[invalid="true"]:data-[selected="true"]:border-red-500',
          'data-[invalid="true"]:data-[pressed="true"]:bg-red-600 data-[invalid="true"]:data-[pressed="true"]:border-red-600',
          classNames?.control
        )}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <div
          data-invalid={props?.isInvalid}
          className={cn(
            'w-3 h-3 rounded-full bg-slate-900 opacity-0 transition-all duration-300 ease data-[invalid="true"]:bg-red-500',
            {
              'opacity-100': props?.isSelected,
            }
          )}
        />
      </div>
    );
  }
  return typeof control === 'function' ? control(props) : control;
}

export function Radio({
  children,
  slots,
  className,
  classNames,
  ...props
}: RadioProps) {
  return (
    <AriaRadio
      className={cn(
        'flex items-center gap-2 group',
        'invalid:text-red-500 invalid:disabled:text-red-300',
        'disabled:text-slate-400',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {(renderProps) => (
        <>
          <ControlSlot
            control={slots?.control}
            classNames={classNames}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...renderProps}
          />
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </AriaRadio>
  );
}

Radio.defaultProps = {
  children: undefined,
  slots: undefined,
  classNames: undefined,
};

export default Radio;
