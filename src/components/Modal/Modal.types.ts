import type { ReactNode } from 'react';
import type { ModalOverlayProps } from 'react-aria-components';

export interface ModalProps extends Omit<ModalOverlayProps, 'children'> {
  children: ReactNode;
}
