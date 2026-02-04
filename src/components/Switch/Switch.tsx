'use client';

import { Switch as AriaSwitch } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { SlotsToClasses } from '../../types/SlotsToClasses';
import type { SwitchProps, SwitchRenderProps } from './Switch.types';

export function Switch({
  children,
  className,
  classNames,
  ...props
}: SwitchProps & {
  classNames?: SlotsToClasses<'indicator'>;
}) {
  return (
    <AriaSwitch
      className={cn(
        'flex items-center gap-2 text-sm text-slate-500 forced-color-adjust-none group',
        '',
        className,
      )}
      {...props}
    >
      {(renderProps: SwitchRenderProps) => {
        const { isSelected, isHovered, isFocused, isPressed, isDisabled } =
          renderProps;
        return (
          <>
            <div
              className={cn(
                'w-12 h-7 bg-transparent border-solid border border-slate-300 rounded-3xl transition-all duration-200 ease-in-out',
                'before:block before:w-5 before:h-5 before:m-[3px] before:bg-slate-300 before:rounded-full',
                'before:transition-all before:duration-200 before:ease-in-out',
                [
                  isHovered && 'border-slate-400',
                  isSelected && [
                    ' bg-slate-300 before:translate-x-full before:bg-white',
                    (isHovered || isFocused) && 'border-slate-400',
                  ],
                  isFocused && ['outline outline-2 outline-slate-200'],
                  isPressed && 'before:bg-slate-400',
                  isDisabled && 'bg-slate-100',
                  classNames?.indicator,
                ],
              )}
            />

            {typeof children === 'function'
              ? children({
                  defaultChildren: undefined,
                  ...renderProps,
                })
              : children}
          </>
        );
      }}
    </AriaSwitch>
  );
}

export default Switch;
