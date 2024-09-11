import {
  ModalOverlayProps,
  ModalOverlay as UIModalOverlay,
} from 'react-aria-components';
import { cn } from '../utils';
import styles from './styles.module.css';

export function ModalOverlay({ className, ...props }: ModalOverlayProps) {
  return (
    <UIModalOverlay
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={cn(
        'backdrop-blur bg-black/30',
        'fixed top-0 left-0',
        'z-50',
        'w-screen h-[var(--visual-viewport-height)]',
        // Tracking of overlay state changes is done through data attributes.
        styles.animateOverlay,
        className
      )}
    />
  );
}

export default ModalOverlay;
