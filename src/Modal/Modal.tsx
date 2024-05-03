import { ModalRenderProps } from 'react-aria-components';
import { StyledModal } from './styles';

export function Modal(props: ModalRenderProps) {
  return (
    <StyledModal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default Modal;
