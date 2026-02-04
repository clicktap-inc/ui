'use client';

import { forwardRef } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      isDisabled = false,
      isLoading = false,
      size = 'md',
      variant = 'solid',
      ...props
    },
    ref,
  ) {
    const baseClasses = [
      'flex items-center justify-center',
      'rounded-md border-solid border',
      'font-semibold text-sm',
      'py-2 px-8',
      'transition-all duration-200 ease-in-out',
      'focus:outline-2 focus:outline focus:outline-slate-200 pressed:scale-95',
      // size logic:
      size === 'sm' && 'h-8',
      size === 'md' && 'h-10',
      size === 'lg' && 'h-12',
      // variant logic:
      variant === 'ghost' && [
        'bg-transparent hover:bg-transparent focus:bg-transparent disabled:bg-transparent',
        'border-transparent hover:border-transparent focus:border-transparent disabled:border-transparent',
        'text-slate-900 disabled:text-slate-400',
        isLoading && 'disabled:text-slate-900',
      ],
      variant === 'outline' && [
        'bg-transparent hover:bg-transparent focus:bg-transparent disabled:bg-transparent',
        'border-slate-300 hover:border-slate-400 focus:border-slate-400 disabled:border-slate-200',
        'text-slate-900 disabled:text-slate-500',
        isLoading && ['disabled:border-slate-300', 'disabled:text-slate-900'],
      ],
      variant === 'solid' && [
        'bg-slate-800 hover:bg-slate-900 focus:bg-slate-900 disabled:bg-slate-900',
        'border-slate-800 hover:border-slate-900 focus:border-slate-900 disabled:border-slate-200',
        'text-white disabled:text-slate-400',
        isLoading && ['disabled:border-slate-900', 'disabled:text-white'],
      ],
    ];

    return (
      <AriaButton
        ref={ref}
        type="button"
        isDisabled={isDisabled}
        className={(renderProps) => {
          const userClasses =
            typeof className === 'function'
              ? className(renderProps)
              : className;

          return cn(baseClasses, userClasses);
        }}
        {...props}
      />
    );
  },
);

export default Button;
