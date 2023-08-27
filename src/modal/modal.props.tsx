import type { MouseEvent, PropsWithChildren, ReactElement } from 'react';
import type { CSSProp } from 'styled-components';
import { Theme } from '../theming/theming';

export interface ModalProps extends PropsWithChildren {
  css?: CSSProp;
  theme?: Theme | undefined;
  showBackdrop?: boolean; // If true, the backdrop is rendered.
  canClose?: boolean; // If true, allows user to close the modal by clicking the close button (if visible) or the backdrop element.
  enforceFocus?: boolean; // If true, enforces focus to remain within the modal. Can make modal less accessible to assistive technologies like screen readers.
  escapeKeyDown?: boolean; // If true, hitting escape will fire the onClose callback.
  isAnimating?: boolean;
  keepMounted?: boolean; // Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Modal.
  onBackdropClick?: (e: MouseEvent) => void; // Callback fired on backdrop element's click event.
  onMouseDown?: (e: MouseEvent) => void; // Callback fired on click event.
  onClose?: () => void; // Callback fired when the component requests to be closed.
  onKeyDown?: (e: KeyboardEvent) => void; // Callback fired on keyDown event.
  onOpen?: () => void; // Callback fired when the component requests to be opened.
  open?: boolean; // If true, the component is shown.
  portal?: boolean; // The children will be under the DOM hierarchy of the parent component. Useful for SSR.
  portalContainer?: Element | DocumentFragment; // An HTML element. The container will have the portal children appended to it. Will be ignored, when portal will not be provided (useful for SSR). By default, it uses the body of the top-level document object, so it's simply document.body most of the time.
  restoreFocus?: boolean; // If true, restores focus to the element clicked before the modal was opened (if available).
  scrollLock?: boolean; // Enable the scroll lock behavior.
  showClose?: boolean; // If true, the close button is rendered.
  slots?: {
    backdropRoot?: ReactElement /** @todo make a component type with proper props */; // component to render for the Backdrop slot
    backdrop?: ReactElement /** @todo make a component type with proper props */; // component to render for the Backdrop slot
    closeButtonRoot?: ReactElement /** @todo make a component type with proper props */; // component to render for the CloseButtonRoot slot
    closeButton?: ReactElement /** @todo make a component type with proper props */; // component to render for the CloseButton slot
    content?: ReactElement /** @todo make a component type with proper props */; // Component to render for the Content slot
    contentRoot?: ReactElement /** @todo make a component type with proper props */; // Component to render for the ContentRoot slot
  };
}
