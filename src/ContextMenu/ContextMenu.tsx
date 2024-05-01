import { Menu, PopoverProps as AriaPopoverProps } from 'react-aria-components';
import { Dispatch, Key, SetStateAction, ReactNode } from 'react';
import { StyledPopover } from './styles';

export type ContextMenuAnimationState = 'unmounted' | 'hidden' | 'visible';

interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
  animation: ContextMenuAnimationState;
  children: ReactNode;
  onAction?: (key: Key) => void;
  setAnimation: Dispatch<SetStateAction<ContextMenuAnimationState>>;
  key?: Key | null;
}

export function ContextMenu({
  children,
  key,
  onAction,
  setAnimation,
  animation = 'hidden',
  ...props
}: PopoverProps) {
  return (
    <StyledPopover
      key={key}
      isExiting={animation === 'hidden'}
      onAnimationComplete={(completedAnimation: string) => {
        setAnimation((a) =>
          completedAnimation === 'hidden' && a === 'hidden' ? 'unmounted' : a
        );
      }}
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={animation}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Menu style={{ outline: 'none' }} onAction={onAction}>
        {children}
      </Menu>
    </StyledPopover>
  );
}

ContextMenu.defaultProps = {
  key: undefined,
  onAction: undefined,
};

export default ContextMenu;
