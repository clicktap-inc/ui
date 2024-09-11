import { useSeparator } from 'react-aria';
import { cn } from '../utils';
import { DividerProps } from './types';

export function Divider({
  orientation = 'horizontal',
  className,
  ...props
}: DividerProps) {
  const { separatorProps } = useSeparator({ ...props, orientation });
  const combinedProps = { ...props, ...separatorProps };

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...combinedProps}
      className={cn(
        'bg-slate-200',
        ['w-full', 'h-px', 'my-4', 'mx-0'],
        [
          'aria-[orientation=vertical]:w-px',
          'aria-[orientation=vertical]:h-auto',
          'aria-[orientation=vertical]:my-0',
          'aria-[orientation=vertical]:mx-4',
        ],
        className
      )}
    />
  );
}

export default Divider;
