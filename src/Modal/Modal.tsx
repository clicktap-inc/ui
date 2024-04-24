import { PropsWithChildren } from 'react';
import { StyledModal } from './styles';

export function Modal(props: PropsWithChildren) {
  return (
    <StyledModal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default Modal;
