import { DialogProps, Dialog } from 'react-aria-components';
import styles from './styles.module.css';
import { cn } from '../utils';

export type DrawerProps = DialogProps & {
  direction?: 'top' | 'right' | 'bottom' | 'left';
};

export function Drawer({ direction, className, ...props }: DrawerProps) {
  return (
    <Dialog
      className={cn(
        'fixed p-8 outline-0 bg-white',
        'border-solid border-slate-200',
        direction === 'top' &&
          'top-0 bottom-[calc(100%-20rem)] inset-x-0 border-b shadow-[0_8px_24px_rgba(0,0,0,0.1)]',
        direction === 'right' &&
          'top-0 inset-y-0 left-[calc(100%-20rem)] border-l shadow-[-8px_0_24px_rgba(0,0,0,0.1)]',
        direction === 'bottom' &&
          'top-[calc(100%-20rem)] inset-x-0 bottom-0 border-t shadow-[0_-8px_24px_rgba(0,0,0,0.1)]',
        direction === 'left' &&
          'inset-y-0 left-0 right-[calc(100%-20rem)] border-r shadow-[8px_0_24px_rgba(0,0,0,0.1)]',
        styles.ariaDrawer,
        className
      )}
      data-direction={direction}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

Drawer.defaultProps = {
  direction: 'right',
};

export default Drawer;
