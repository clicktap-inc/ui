import { useContext } from 'react';
import { CollapsibleContentRoot } from './styles';
import type { CollapsibleContentProps } from './types';
import { CollapsibleTriggerStateContext } from './CollapsibleTrigger';

export function Collapsible({ children }: CollapsibleContentProps) {
  const { isOpen, id, defaultOpen } = useContext(
    CollapsibleTriggerStateContext
  );
  return (
    <CollapsibleContentRoot
      id={id}
      variants={{
        hidden: { height: '0px', opacity: 0 },
        visible: { height: 'auto', opacity: 1 },
      }}
      initial={defaultOpen ? 'visible' : 'hidden'}
      animate={isOpen ? 'visible' : 'hidden'}
      transition={{
        type: 'spring',
        bounce: 0,
      }}
    >
      {children}
    </CollapsibleContentRoot>
  );
}

export default Collapsible;
