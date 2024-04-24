import { DialogProps } from 'react-aria-components';
import { StyledDialog, StyledDialogAnimations } from './styles';

export function Dialog(props: DialogProps) {
  return (
    <>
      <StyledDialogAnimations />
      <StyledDialog
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </>
  );
}

export default Dialog;
