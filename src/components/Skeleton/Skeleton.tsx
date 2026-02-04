import { cn } from '../../utils/cn';
import type { SkeletonProps } from './Skeleton.types';

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative rounded-md animate-pulse bg-slate-200',
        className,
      )}
    />
  );
}

export default Skeleton;
