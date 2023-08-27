/** @todo create utility component for createPortal */
import {
  // KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useState,
  HTMLAttributes,
  // useRef,
  // useCallback,
  forwardRef,
  ForwardedRef,
  cloneElement,
  // KeyboardEventHandler,
} from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './modal.props';
import {
  StyledModalBackdrop,
  StyledModalCloseButton,
  StyledModalCloseButtonWrap,
  StyledModalContent,
  StyledModalRoot,
} from './modal.styles';

/** @todo create utility for this? */
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

interface ModalRootProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  onMouseDown: (e: MouseEvent) => void;
  open: boolean;
  // eslint-disable-next-line react/require-default-props, @typescript-eslint/no-explicit-any
  // onKeyDown?: KeyboardEventHandler<Window>;
}
export const ModalRoot = forwardRef(
  (
    { children, ...props }: ModalRootProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <StyledModalRoot {...props} ref={ref}>
        {children}
      </StyledModalRoot>
    );
  }
);

type ModalBackdropProps = {
  onMouseDown: (e: MouseEvent) => void;
};
export function ModalBackdrop({ onMouseDown }: ModalBackdropProps) {
  return <StyledModalBackdrop onMouseDown={onMouseDown} />;
}

export function Modal({
  canClose = true,
  children,
  // enforceFocus = false,
  escapeKeyDown = true,
  // isAnimating = false,
  // keepMounted = false,
  onBackdropClick,
  onMouseDown,
  onClose,
  onKeyDown,
  onOpen,
  open = false,
  portal = true,
  portalContainer,
  // restoreFocus = true,
  // scrollLock = true,
  showBackdrop = true,
  showClose = true,
  slots,
  ...props
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(open);
  // const modalRootRef = useCallback((node: HTMLDivElement) => {
  //   // if (node !== null) {
  //   //   window.addEventListener('keydown', handleModalRootKeyDown);
  //   // }
  // }, []);

  const handleModalRootKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onKeyDown && onKeyDown(e);
    if (
      canClose &&
      isOpen &&
      escapeKeyDown &&
      (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onClose && onClose();
      setIsOpen(!isOpen);
    }
  };
  const handleModalCloseButton = () => {
    if (canClose) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onClose && onClose();
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (open && onOpen) onOpen();
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    window.addEventListener('keydown', handleModalRootKeyDown);

    return () => {
      window.removeEventListener('keydown', handleModalRootKeyDown);
    };
  }, [isOpen]);

  // if (!isOpen) {
  //   return null;
  // }

  const handleModalRootMouseDown = () => {
    if (canClose) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onClose && onClose();
      setIsOpen(!isOpen);
    }
  };

  const BackdropSlot = slots?.backdrop ? (
    cloneElement(slots?.backdrop, {
      onMouseDown: (e: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onBackdropClick && onBackdropClick(e);
      },
    })
  ) : (
    <ModalBackdrop
      onMouseDown={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onBackdropClick && onBackdropClick(e);
      }}
    />
  );

  // add content root slot to allow users to wrap content in something like AnimatePresence
  const BackdropRootSlot = slots?.backdropRoot
    ? cloneElement(
        slots.backdropRoot,
        {},
        isOpen && showBackdrop && BackdropSlot
      )
    : null;

  const CloseButtonSlot = slots?.closeButton ? (
    cloneElement(slots.closeButton, {
      type: 'button',
      onClick: handleModalCloseButton,
    })
  ) : (
    <StyledModalCloseButton type="button" onClick={handleModalCloseButton}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StyledModalCloseButton>
  );
  const CloseButtonRootSlot = slots?.closeButtonRoot ? (
    cloneElement(slots.closeButtonRoot, {}, CloseButtonSlot)
  ) : (
    <StyledModalCloseButtonWrap>{CloseButtonSlot}</StyledModalCloseButtonWrap>
  );

  /** @todo should we automatically add props/children to slot components? */
  const ContentSlot = slots?.content ? (
    cloneElement(
      slots?.content,
      {
        role: 'dialog',
        onMouseDown: (e: MouseEvent) => {
          e.stopPropagation();
        },
      },
      <>
        {showClose && CloseButtonRootSlot}
        {children}
      </>
    )
  ) : (
    <StyledModalContent
      role="dialog"
      onMouseDown={(e: MouseEvent) => {
        e.stopPropagation();
      }}
    >
      {showClose && CloseButtonRootSlot}
      {children}
    </StyledModalContent>
  );

  // add content root slot to allow users to wrap content in something like AnimatePresence
  const ContentRootSlot = slots?.contentRoot
    ? cloneElement(slots.contentRoot, {}, isOpen && ContentSlot)
    : null;

  const ModalContent = (
    <ModalRoot
      onMouseDown={handleModalRootMouseDown}
      open={isOpen}
      // style={{ display: isOpen || isAnimating ? 'flex' : 'none' }}
      // ref={modalRootRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {BackdropRootSlot ?? (isOpen && showBackdrop && BackdropSlot)}
      {ContentRootSlot ?? (isOpen && ContentSlot)}
    </ModalRoot>
  );

  return portal && canUseDOM
    ? createPortal(ModalContent, portalContainer ?? document.body)
    : ModalContent;
}

export default Modal;
