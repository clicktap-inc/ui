import { ModalOverlayProps, Modal as UIModal } from 'react-aria-components';
import { cn } from '../utils';

interface ModalProps extends Omit<ModalOverlayProps, 'children'> {
  children: React.ReactNode;
}

export function Modal({ children, className, ...props }: ModalProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <UIModal {...props} className={cn('absolute inset-1/2', className)}>
      {children}
    </UIModal>
  );
}

export default Modal;
