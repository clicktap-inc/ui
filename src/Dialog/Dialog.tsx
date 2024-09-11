import { DialogProps, Dialog as AriaDialog } from 'react-aria-components';
import styles from './styles.module.css';
import { cn } from '../utils';

export function Dialog({ className, ...props }: DialogProps) {
  return (
    <AriaDialog
      className={cn(
        'p-8 outline-0 max-w-max w-screen absolute top-2/4 left-2/4',
        'shadow-[0_8px_24px_rgba(0,0,0,0.1)] rounded-lg bg-white border border-solid border-slate-400',
        'transform -translate-x-1/2 -translate-y-1/2',
        styles.ariaDialog,
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default Dialog;
