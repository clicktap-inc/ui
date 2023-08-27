import { Modal } from '../modal/modal';
import type { DrawerProps } from './drawer.props';
import { StyledContent } from './drawer.styles';

export function Drawer({
  children,
  position = 'left',
  slots,
  ...props
}: DrawerProps) {
  const mergedSlots = slots?.content
    ? slots
    : {
        ...slots,
        content: <StyledContent position={position} />,
      };

  return (
    <Modal
      slots={mergedSlots}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Modal>
  );
}

export default Drawer;
