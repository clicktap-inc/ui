import { cloneElement, useState } from 'react';
import {
  useFloating,
  useInteractions,
  useHover,
  useClick,
  useDismiss,
  offset as offsetMiddleware,
  flip,
  shift,
  useFocus,
} from '@floating-ui/react';
import type { MenuProps } from './menu.props';
import { SubmenuWrap } from './menu.styles';
// import { parent } from './menu.middleware';

export function Menu({
  closeDelay = 500,
  offset = 10,
  openDelay = 0,
  placement = 'bottom-start',
  slots,
  trigger = ['hover', 'focus'],
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    placement,
    middleware: [/* parent, */ offsetMiddleware(offset), flip(), shift()],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  /** @todo figure out what type to pass to interaction functions so build doesn't fail */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dismiss = useDismiss(context);
  const delay = {
    open: openDelay,
    close: closeDelay,
  };

  const interactions = [
    trigger.find((value) => value === 'hover')
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        useHover(context, { delay })
      : undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    trigger.find((value) => value === 'click') ? useClick(context) : undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    trigger.find((value) => value === 'focus') ? useFocus(context) : undefined,
    dismiss,
  ];

  const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

  const Content = slots?.content ? (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    cloneElement(slots.content, {
      ...slots.content.props,
      ref: refs.setReference,
      ...getReferenceProps(),
    })
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={refs.setReference} {...getReferenceProps()}>
      Menu Action
    </div>
  );
  const Submenu = slots?.submenu ? (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    cloneElement(slots.submenu, {
      ...slots.submenu.props,
      ref: refs.setFloating,
      style: {
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        width: 'max-content',
      },
      ...getFloatingProps(),
    })
  ) : (
    <SubmenuWrap
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        width: 'max-content',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getFloatingProps()}
    >
      Submenu
    </SubmenuWrap>
  );

  return (
    <>
      {Content}
      {isOpen && Submenu}
    </>
  );
}

export default Menu;
