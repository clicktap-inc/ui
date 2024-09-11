import { PropsWithChildren, HTMLAttributes } from 'react';

export type CollapsibleTriggerState = {
  isOpen: boolean;
  id: string;
  defaultOpen: boolean;
};

export type CollapsibleTriggerProps = PropsWithChildren<{
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string | undefined;
}>;

export type CollapsibleContentProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>;
