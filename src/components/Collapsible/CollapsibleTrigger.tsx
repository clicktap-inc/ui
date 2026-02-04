'use client';

import { Provider } from 'react-aria-components';
import { useControlledState } from '@react-stately/utils';
import { createContext, useCallback, useId } from 'react';
import { usePress } from '@react-aria/interactions';
import {
  CollapsibleTriggerProps,
  CollapsibleTriggerState,
} from './CollapsibleTrigger.types';
import { cn } from '../../utils/cn';

/** @todo look into use hook to provide access instead of exporting directly */
export const CollapsibleTriggerStateContext =
  createContext<CollapsibleTriggerState>({} as CollapsibleTriggerState);

export function CollapsibleTrigger({
  children,
  className,
  ...props
}: CollapsibleTriggerProps) {
  const id = useId();
  const [isOpen, onOpenChange] = useControlledState(
    props.isOpen,
    props.defaultOpen || false,
    props.onOpenChange,
  );

  const toggle = useCallback(() => {
    onOpenChange(!isOpen);
  }, [onOpenChange, isOpen]);

  const { pressProps } = usePress({
    onPress: toggle,
  });

  return (
    <Provider
      values={[
        [
          CollapsibleTriggerStateContext,
          { isOpen, id, defaultOpen: props.defaultOpen || false },
        ],
      ]}
    >
      <div
        {...pressProps}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={id}
        className={cn('w-full', className)}
      >
        {children}
      </div>
    </Provider>
  );
}

export default CollapsibleTrigger;
