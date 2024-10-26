'use client';

import { cn } from '../../utils/cn';
import type { CardProps } from './Card.types';

export function Card({ children, className, ...props }: CardProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
