import { ModalOverlayProps } from 'react-aria-components';
import { StyledModalOverlay } from './styles';

export function ModalOverlay(props: ModalOverlayProps) {
  return (
    <StyledModalOverlay
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default ModalOverlay;
