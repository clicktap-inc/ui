import { Provider } from 'react-aria-components';
import { useControlledState } from '@react-stately/utils';
import { createContext, useCallback, useId, useRef } from 'react';
import { PressResponder } from '@react-aria/interactions';
import { CollapsibleTriggerProps, CollapsibleTriggerState } from './types';
import { cn } from '../utils';

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
    props.onOpenChange
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    onOpenChange(!isOpen);
  }, [onOpenChange, isOpen]);

  return (
    <Provider
      values={[
        [
          CollapsibleTriggerStateContext,
          { isOpen, id, defaultOpen: props.defaultOpen || false },
        ],
      ]}
    >
      <PressResponder
        ref={buttonRef}
        isPressed={isOpen}
        onPress={toggle}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <div className={cn('w-full', className)}>{children}</div>
      </PressResponder>
    </Provider>
  );
}

export default CollapsibleTrigger;
