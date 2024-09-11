import { Link as UiLink, LinkProps } from 'react-aria-components';
import { cn } from '../utils';

export function Link({ children, isDisabled, className, ...props }: LinkProps) {
  return (
    <UiLink
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      isDisabled={isDisabled}
      className={cn(
        'cursor-pointer',
        'text-slate-500',
        'no-underline',
        'transition-colors duration-300',
        'hover:text-slate-800',
        [
          'data-[disabled="true"]:cursor-default',
          'data-[disabled="true"]:text-slate-300',
          'data-[disabled="true"]:hover:text-slate-300',
        ],
        className
      )}
    >
      {children}
    </UiLink>
  );
}

export default Link;
