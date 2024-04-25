import { DialogProps } from 'react-aria-components';
import { StyledDrawer, StyledDrawerAnimations } from './styles';

export type DrawerProps = DialogProps & {
  direction?: 'top' | 'right' | 'bottom' | 'left';
};

export function Drawer({ direction, ...props }: DrawerProps) {
  return (
    <>
      <StyledDrawerAnimations />
      <StyledDrawer
        data-direction={direction}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </>
  );
}

Drawer.defaultProps = {
  direction: 'right',
};

export default Drawer;
