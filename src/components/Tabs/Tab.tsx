'use client';

import { useContext } from 'react';
import { Tab as AriaTab } from 'react-aria-components';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { SlotsToClasses } from '../../types/SlotsToClasses';
import type { TabProps, TabRenderProps } from './Tab.types';
import type { TabsProps } from './Tabs.types';
import { TabsOrientationContext } from './Tabs.context';

export function BaseTab({
  orientation,
  variant = 'base',
  className,
  children,
  ...props
}: TabProps & { orientation: TabsProps['orientation'] }) {
  return (
    <AriaTab
      className={cn(
        'flex items-center relative z-10',
        'text-sm cursor-pointer forced-color-adjust-none',
        'transition-all duration-300 ease-in-out',
        'justify-center',
        'disabled:opacity-50',
        'selected:outline-0 hover:outline-0 hover:text-slate-500',
        variant === 'underline' &&
          orientation === 'vertical' &&
          'justify-start',
        'py-2 px-3',
        variant === 'underline' && orientation === 'horizontal' && 'p-3',
        variant === 'underline' &&
          orientation === 'vertical' &&
          'py-3 pr-3 pl-0',
        (variant === 'underline' ||
          variant === 'outline' ||
          variant === 'enclosed') &&
          'text-slate-800',
        variant === 'solid' && 'text-slate-400',
        (variant === 'underline' || variant === 'outline') &&
          'selected:text-slate-800',
        (variant === 'solid' || variant === 'enclosed') &&
          'selected:text-slate-100',
        className
      )}
      {...props}
    >
      {children}
    </AriaTab>
  );
}

export function Tab({
  variant = 'base',
  children,
  className,
  classNames,
  ...props
}: TabProps & {
  classNames?: SlotsToClasses<'overflow'>;
}) {
  const orientation = useContext(TabsOrientationContext);

  return (
    <BaseTab
      orientation={orientation}
      variant={variant}
      className={className}
      {...props}
    >
      {(renderProps: TabRenderProps) => (
        <>
          {typeof children === 'function'
            ? children({
                defaultChildren: undefined,
                ...renderProps,
              })
            : children}

          {(renderProps.isFocusVisible || renderProps.isSelected) && (
            <motion.span
              className={cn(
                'absolute z-0',
                variant === 'solid' &&
                  'inset-0 rounded-lg bg-slate-600 mix-blend-color',
                variant === 'outline' &&
                  'inset-0 rounded-lg border-solid border-2 border-slate-800',
                variant === 'underline' &&
                  'rounded-lg bg-slate-800 mix-blend-color bottom-0',
                variant === 'underline' &&
                  orientation === 'horizontal' &&
                  'left-0 w-full h-px',
                variant === 'underline' &&
                  orientation === 'vertical' &&
                  'right-0 w-px h-full',
                variant === 'enclosed' &&
                  'inset-0 border-solid border-1 border-slate-800 -mb-px border-b-0 rounded-t-lg rounded-b-none bg-white mix-blend-difference',
                variant === 'base' && 'hidden',
                classNames?.overflow
              )}
              layoutId={variant}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.75,
              }}
            />
          )}
        </>
      )}
    </BaseTab>
  );
}

export default Tab;
