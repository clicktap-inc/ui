'use client';

import { cloneElement, useState, useRef, useId } from 'react';
import { motion } from 'framer-motion';
import {
  flip,
  shift,
  arrow as arrowMiddleware,
  offset as offsetMiddleware,
  useFocus,
  useRole,
  useFloating,
  useInteractions,
  useHover,
  useClick,
  useDismiss,
  useDelayGroupContext,
  useDelayGroup,
  FloatingArrow,
  autoUpdate,
} from '@floating-ui/react';
import type { ButtonProps } from 'react-aria-components';
import type { MenuProps } from './Menu.types';

// This component uses @floating-ui/react which requires passing refs during render.
// The refs.setReference, refs.setFloating, and arrowRef are callback refs, not ref.current access.
/* eslint-disable react-hooks/refs */
export function Menu({
  closeDelay = 300,
  offset = 20,
  openDelay = 0,
  placement = 'bottom-start',
  slots,
  trigger = ['hover', 'focus'],
  withArrow = true,
  arrow,
  role = 'dialog',
  visible = {},
  hidden = {},
  floatingOptions = {},
  isOpen,
  onOpenChange,
}: MenuProps) {
  const [isOpenUncontrolled, setIsOpenUncontrolled] = useState(false);
  const arrowRef = useRef(null);
  const id = useId();
  const { x, y, strategy, refs, context } = useFloating({
    placement,
    middleware: [
      offsetMiddleware(offset),
      flip(),
      shift(),
      arrowMiddleware({
        element: arrowRef,
      }),
    ],
    open: isOpen || isOpenUncontrolled,
    onOpenChange: onOpenChange || setIsOpenUncontrolled,
    whileElementsMounted: autoUpdate,
    ...floatingOptions,
  });

  const dismissConfig = useDismiss(context);
  const roleConfig = useRole(context, {
    role,
  });
  const { delay: delayGroup } = useDelayGroupContext();
  const delay = {
    open: openDelay,
    close: closeDelay,
  };
  const hoverConfig = useHover(context, { delay: delayGroup || delay });
  const focusConfig = useFocus(context);
  const clickConfig = useClick(context);

  const interactions = [
    trigger.find((value) => value === 'hover') ? hoverConfig : undefined,
    trigger.find((value) => value === 'click') ? clickConfig : undefined,
    trigger.find((value) => value === 'focus') ? focusConfig : undefined,
    dismissConfig,
    roleConfig,
  ];

  const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

  useDelayGroup(context, { id });

  // https://github.com/floating-ui/floating-ui/issues/2646
  const { onClick, ...referenceProps } = getReferenceProps();
  const keyboardEvents = String(
    (slots?.content?.props as ButtonProps).className
  ).includes('pressable')
    ? { onPress: onClick }
    : { onClick };

  const ContentSlot = slots?.content ? (
    cloneElement(slots.content, {
      ...slots.content.props,
      ref: refs.setReference,
      ...referenceProps,
      ...keyboardEvents,
    })
  ) : (
    <div ref={refs.setReference} {...getReferenceProps()}>
      Menu Action
    </div>
  );

  const SubmenuSlot = slots?.submenu ? (
    <motion.nav
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        width: 'max-content',
        zIndex: 50,
      }}
      {...getFloatingProps()}
      variants={{ hidden, visible }}
      initial="hidden"
      animate={isOpen || isOpenUncontrolled ? 'visible' : 'hidden'}
    >
      {withArrow && (
        <FloatingArrow ref={arrowRef} context={context} {...arrow} />
      )}

      {slots.submenu}
    </motion.nav>
  ) : (
    <nav>Submenu</nav>
  );

  return (
    <>
      {ContentSlot}
      {SubmenuSlot}
    </>
  );
}
/* eslint-enable react-hooks/refs */

export default Menu;
