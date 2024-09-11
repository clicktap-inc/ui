import { useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge as NextUIBadge } from '@nextui-org/badge';
import { cn } from '../utils';
import { BadgeProps } from './types';

const animationVariants = {
  hidden: {
    opacity: 0,
    transform: 'scale(0)',
  },
  show: {
    opacity: 1,
    transform: 'scale(1)',
  },
};

export function Badge({
  children,
  isInvisible,
  disableAnimation,
  placement = 'top-right',
  shape = 'rectangle',
  className,
  classNames,
  showOutline = false,
  content,
  isDot,
  isOneChar,
  size = 'md',
  variant = 'solid',
  ...props
}: BadgeProps) {
  const id = useId();
  const transition = disableAnimation
    ? { duration: 0 }
    : { type: 'spring', bounce: 0.3 };

  const isOneCharContent = String(content)?.length === 1 || isOneChar;

  const textVariants = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
  };

  const oneCharSizeVariants = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const sizeVariants = {
    sm: 'min-w-4 h-4',
    md: 'min-w-5 h-5',
    lg: 'min-w-6 h-6',
  };

  const sizeVariant = isOneCharContent
    ? oneCharSizeVariants[size]
    : sizeVariants[size];

  return (
    <NextUIBadge
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      size={size}
      variant={variant}
      isInvisible={isInvisible}
      isDot={isDot}
      classNames={{
        base: cn('relative', 'inline-flex shrink-0', classNames?.base),
        badge: cn(
          'p-0',
          'border-0',
          'absolute z-10',
          [
            placement === 'top-right' &&
              shape === 'rectangle' &&
              'top-0.5 right-px',
            placement === 'top-right' && shape === 'circle' && 'top-1 right-1',

            placement === 'bottom-right' &&
              shape === 'rectangle' &&
              'bottom-0.5 right-px',
            placement === 'bottom-right' &&
              shape === 'circle' &&
              'bottom-1 right-1',

            placement === 'top-left' &&
              shape === 'rectangle' &&
              'top-0.5 left-px',
            placement === 'top-left' && shape === 'circle' && 'top-1 left-1',

            placement === 'bottom-left' &&
              shape === 'rectangle' &&
              'bottom-0.5 left-px',
            placement === 'bottom-left' &&
              shape === 'circle' &&
              'bottom-1 left-1',
          ],
          [
            placement === 'top-right' && 'translate-x-1/2 -translate-y-1/2',
            placement === 'bottom-right' && 'translate-x-1/2 translate-y-1/2',
            placement === 'bottom-left' && '-translate-x-1/2 translate-y-1/2',
            placement === 'top-left' && '-translate-x-1/2 -translate-y-1/2',
          ],
          classNames?.badge
        ),
      }}
      content={
        <AnimatePresence>
          {!isInvisible && (
            <motion.div
              layout
              key={`badge-${id}`}
              variants={animationVariants}
              initial={disableAnimation ? 'show' : 'hidden'}
              transition={transition}
              animate="show"
              exit="hidden"
              className={cn(
                'flex flex-wrap',
                'place-content-center',
                'z-10',
                'box-border',
                'rounded-full',
                'py-0 px-1',
                'font-normal text-slate-900',
                'select-none',
                // 'transition-transform transition-opacity duration-300 ease-in-out',
                'whitespace-normal',
                variant === 'faded' ? 'text-slate-800' : 'text-white',
                !content || isDot ? 'w-3.5 h-3.5' : sizeVariant,
                (typeof content === 'string' && content.length > 1) || isDot
                  ? 'text-xs'
                  : textVariants[size],
                [
                  variant === 'solid' && 'bg-slate-800',
                  variant === 'shadow' && 'bg-slate-800',
                  variant === 'flat' && 'bg-slate-800/55',
                  variant === 'faded' && 'bg-white',
                ],
                [
                  variant === 'faded' &&
                    'border-2 border-solid border-slate-800',
                  showOutline &&
                    variant !== 'faded' &&
                    'border-2 border-solid border-white',
                ],
                variant === 'shadow' &&
                  'shadow-[0_0_0_0_rgba(0,0,0,0),_0_0_0_0_rgba(0,0,0,0),_0_10px_15px_-3px_rgba(30,41,59,0.3),_0_4px_6px_-4px_rgba(30,41,59,0.3)]',
                className
              )}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      }
    >
      {children}
    </NextUIBadge>
  );
}

export default Badge;
