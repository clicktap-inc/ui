import type { ModalProps } from '../modal/modal.props';

export interface DrawerProps extends ModalProps {
  position?: 'top' | 'right' | 'bottom' | 'left';
}
