import { cloneElement, useState } from 'react';
import type { CollapseProps } from './collapse.props';

export function Collapse({
  children,
  open = false,
  setOpen,
  slots,
  ...props
}: CollapseProps) {
  const [isOpen, setIsOpen] = useState(open);

  const toggleOpen = () => {
    if (setOpen) setOpen(!isOpen);
    setIsOpen(!isOpen);
  };

  const DisclosureSlot = slots?.disclosure ? (
    cloneElement(slots.disclosure, {
      role: 'button',
      onClick: toggleOpen,
      'aria-expanded': isOpen,
    })
  ) : (
    <button type="button" onClick={toggleOpen} aria-expanded={isOpen}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  );

  const ContentSlot = slots?.content ?? <div>{children}</div>;
  const ContentRootSlot = slots?.contentRoot
    ? cloneElement(slots.contentRoot, {}, ContentSlot)
    : null;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...props}>
      {DisclosureSlot}
      {ContentRootSlot ?? (isOpen && ContentSlot)}
    </div>
  );
}

export default Collapse;
