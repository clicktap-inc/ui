'use client';

import { Modal as UIModal } from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { ModalProps } from './Modal.types';

export function Modal({ children, className, ...props }: ModalProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <UIModal {...props} className={cn('absolute inset-1/2', className)}>
      {children}
    </UIModal>
  );
}

export default Modal;
