'use client';

import { useContext } from 'react';
import { motion } from 'framer-motion';
import type { CollapsibleContentProps } from './Collapsible.types';
import { CollapsibleTriggerStateContext } from './CollapsibleTrigger';
import { cn } from '../../utils/cn';

export function Collapsible({ children, className }: CollapsibleContentProps) {
  const { isOpen, id, defaultOpen } = useContext(
    CollapsibleTriggerStateContext
  );
  return (
    <motion.div
      className={cn('w-full overflow-hidden', className)}
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
      // eslint-disable-next-line react/jsx-props-no-spreading
    >
      {children}
    </motion.div>
  );
}

export default Collapsible;
