import { PropsWithChildren, HTMLAttributes } from 'react';
import { cn } from '../utils';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({
  children,
  className,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
