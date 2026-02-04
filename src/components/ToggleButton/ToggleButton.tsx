'use client';

import { ToggleButton as AriaToggleButton } from 'react-aria-components';
import { cn } from '../../utils/cn';
import { ToggleButtonProps } from './ToggleButton.types';

export function ToggleButton({
  children,
  size = 'md',
  variant = 'solid',
  className,
  ...props
}: ToggleButtonProps) {
  return (
    <AriaToggleButton
      className={(renderProps) => {
        const { isDisabled } = renderProps;
        return cn(
          'flex items-center justify-center',
          'font-semibold text-sm',
          'rounded-md border-solid border',
          'px-4',
          'transition-all duration-200 ease-in-out',
          'focus:outline-2 focus:outline focus:outline-slate-200 pressed:scale-95',
          {
            'h-8': size === 'sm',
            'h-10': size === 'md',
            'h-12': size === 'lg',
          },
          [
            variant === 'ghost' && [
              'bg-transparent hover:bg-transparent focus:bg-transparent disabled:bg-transparent',
              'border-transparent hover:border-transparent focus:border-transparent disabled:border-transparent',
              'text-slate-900 disabled:text-slate-400',
              isDisabled && ['disabled:text-slate-900', 'opacity-75'],
            ],
            variant === 'outline' && [
              'bg-transparent hover:bg-transparent focus:bg-transparent disabled:bg-transparent',
              'border-slate-300 hover:border-slate-400 focus:border-slate-400 disabled:border-slate-200',
              'text-slate-900 disabled:text-slate-500',
              isDisabled && [
                'disabled:border-slate-300',
                'disabled:text-slate-900',
                'opacity-75',
              ],
            ],
            variant === 'solid' && [
              'bg-slate-800 hover:bg-slate-900 focus:bg-slate-900 disabled:bg-slate-900',
              'border-slate-800 hover:border-slate-900 focus:border-slate-900 disabled:border-slate-200',
              'text-white disabled:text-slate-400',
              isDisabled && [
                'disabled:border-slate-900',
                'disabled:text-white',
                'opacity-75',
              ],
            ],
          ],
          typeof className === 'function' ? className(renderProps) : className,
        );
      }}
      {...props}
    >
      {children}
    </AriaToggleButton>
  );
}

export default ToggleButton;
