import { Checkbox as AriaCheckbox } from 'react-aria-components';
import type { CheckboxRenderProps } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { CheckboxProps, CheckboxSlots } from './Checkbox.types';

function ControlSlot({
  control,
  isHovered,
  isFocused,
  isDisabled,
  isIndeterminate,
  isInvalid,
  isSelected,
  isPressed,
  classNames,
  ...rest
}: CheckboxRenderProps &
  Pick<CheckboxSlots, 'control'> &
  Pick<CheckboxProps, 'classNames'>) {
  if (!control) {
    return (
      <div
        className={cn(
          'flex items-center justify-center',
          'w-6 h-6',
          'border border-solid border-slate-300 rounded',
          'transition-all duration-200 ease-in-out',
          'checkbox-control',
          isHovered && ['border-slate-400'],
          isFocused && ['border-slate-400 outline-2 outline outline-slate-200'],
          (isDisabled || (isDisabled && isIndeterminate)) && [
            'border-slate-200 bg-slate-100',
          ],
          isInvalid && ['bg-slate-100 text-red-600 border-red-500'],
          isInvalid && isHovered && ['border-red-600'],
          isInvalid && isFocused && ['border-red-600 outline-red-200'],
          isInvalid &&
            isSelected &&
            isIndeterminate && ['bg-red-500 border-red-500'],
          isInvalid &&
            isSelected &&
            isIndeterminate &&
            isPressed && ['bg-red-600 border-red-600'],
          (isSelected || isIndeterminate) && ['border-slate-300 bg-slate-300'],
          (isSelected || isIndeterminate) &&
            isPressed && ['border-slate-400 bg-slate-400'],
          classNames?.control
        )}
      >
        {/* <Control className="checkbox-control"> */}
        <svg
          viewBox="0 0 18 18"
          aria-hidden="true"
          style={{
            strokeDasharray: '22px',
            strokeDashoffset: isSelected || isIndeterminate ? 44 : 66,
          }}
          className={cn(
            'w-4 h-4 fill-none',
            'stroke-white stroke-[3px]',
            'transition-all duration-200 ease-in-out',
            isDisabled && isIndeterminate && ['stroke-none fill-slate-300'],
            isIndeterminate && ['stroke-none fill-white']
          )}
        >
          {isIndeterminate ? (
            <rect x={1} y={7.5} width={15} height={3} />
          ) : (
            <polyline points="1 9 7 14 15 4" />
          )}
        </svg>
      </div>
    );
  }
  return typeof control === 'function'
    ? control({
        isHovered,
        isFocused,
        isDisabled,
        isIndeterminate,
        isInvalid,
        isSelected,
        isPressed,
        ...rest,
      })
    : control;
}

export function Checkbox({
  children,
  slots,
  className,
  classNames,
  ...props
}: CheckboxProps) {
  return (
    <AriaCheckbox
      className={cn(
        'flex items-center gap-2',
        'text-xs text-slate-500 forced-color-adjust-none disabled:text-slate-400 group',
        'invalid:text-red-500',
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
    </AriaCheckbox>
  );
}

export default Checkbox;
