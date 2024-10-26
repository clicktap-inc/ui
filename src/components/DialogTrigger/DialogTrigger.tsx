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
  const [animation, setAnimation] = useState<DriverAnimationState>('unmounted');

  const onOpenChange = (isOpen: boolean) => {
    setAnimation(isOpen ? 'visible' : 'hidden');
  };

  const value = useMemo(
    () => ({
      animation,
      setAnimation,
      onOpenChange,
    }),
    [animation]
  );

  return (
    <DialogTriggerContext.Provider value={value}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <UIDialogTrigger {...props} onOpenChange={onOpenChange} />
    </DialogTriggerContext.Provider>
  );
}

export default DialogTrigger;
