import { ModalOverlayProps } from 'react-aria-components';
import { StyledModal } from './styles';

interface ModalProps extends Omit<ModalOverlayProps, 'children'> {
  children: React.ReactNode;
}

export function Modal({ children, ...props }: ModalProps) {
  return (
    <StyledModal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </StyledModal>
  );
}

export default Modal;
