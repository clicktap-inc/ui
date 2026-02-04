'use client';

import { cloneElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Menu } from './Menu';
import type { MenuProps } from './Menu.types';

export function ContextMenu({
  slots,
  role = 'tooltip',
  arrow,
  ...rest
}: MenuProps) {
  const arrowConfig = {
    width: 24,
    height: 8,
    className: cn('fill-slate-50', arrow?.className),
    ...arrow,
  };

  const ContentSlot = slots?.submenu
    ? cloneElement(slots?.submenu, {
        ...slots.submenu.props,
      })
    : null;

  const SubmenuSlot = slots?.contentRoot ? (
    cloneElement(
      slots.contentRoot,

      {
        ...slots.contentRoot.props,
      },
      ContentSlot,
    )
  ) : (
    <div className="relative rounded-md py-4 px-6 bg-gray-50 shadow">
      {ContentSlot}
    </div>
  );

  return (
    <AnimatePresence>
      <Menu
        role={role}
        arrow={arrowConfig}
        hidden={{
          opacity: 0,
          y: -5,
          visibility: 'hidden',
          transition: {
            type: 'spring',
            duration: 0.3,
            bounce: 0,
          },
        }}
        visible={{
          opacity: 1,
          y: 0,
          visibility: 'visible',
          transition: {
            type: 'spring',
            duration: 0.75,
            bounce: 0,
            staggerChildren: 0.075,
            delayChildren: 0.1,
          },
        }}
        slots={{
          submenu: SubmenuSlot,
          submenuRoot: slots?.submenuRoot,
          content: slots?.content,
        }}
        {...rest}
      />
    </AnimatePresence>
  );
}

export default ContextMenu;
