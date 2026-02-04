'use client';

import { createContext, useState, useMemo, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { DialogTrigger as UIDialogTrigger } from 'react-aria-components';
import type { DialogTriggerProps } from 'react-aria-components';
import type { DriverAnimationState } from './DialogTrigger.types';

const DialogTriggerContext = createContext<{
  animation: DriverAnimationState;
  setAnimation: Dispatch<SetStateAction<DriverAnimationState>>;
  onOpenChange: (isOpen: boolean) => void;
}>({
  animation: 'unmounted',
  setAnimation: () => {},
  onOpenChange: () => {},
});

export const useDialogTrigger = () => useContext(DialogTriggerContext);

export function DialogTrigger(props: DialogTriggerProps) {
  const { onOpenChange: parentOnOpenChange, ...restProps } = props;
  const [animation, setAnimation] = useState<DriverAnimationState>('unmounted');

  const onOpenChange = (isOpen: boolean) => {
    setAnimation(isOpen ? 'visible' : 'hidden');
    // Call parent's onOpenChange if provided (for controlled mode)
    parentOnOpenChange?.(isOpen);
  };

  const value = useMemo(
    () => ({
      animation,
      setAnimation,
      onOpenChange,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animation, parentOnOpenChange],
  );

  return (
    <DialogTriggerContext.Provider value={value}>
      {}
      <UIDialogTrigger {...restProps} onOpenChange={onOpenChange} />
    </DialogTriggerContext.Provider>
  );
}

export default DialogTrigger;
