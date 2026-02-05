'use client';

import { Modal as UIModal } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { ModalProps } from './Modal.types';

export function Modal({ children, className, ...props }: ModalProps) {
  return (
    <UIModal
      {...props}
      className={cn(
        'absolute inset-0',
        // Allow clicks to pass through to ModalOverlay for dismiss-on-click-outside
        // Children (Dialog/Drawer) have their own pointer-events
        'pointer-events-none [&>*]:pointer-events-auto',
        className,
      )}
    >
      {children}
    </UIModal>
  );
}

export default Modal;
