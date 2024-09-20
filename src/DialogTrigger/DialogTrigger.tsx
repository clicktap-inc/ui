import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useContext,
} from 'react';
import {
  DialogTrigger as UIDialogTrigger,
  DialogTriggerProps,
} from 'react-aria-components';

export type DriverAnimationState = 'unmounted' | 'visible' | 'hidden';

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
