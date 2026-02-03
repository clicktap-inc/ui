import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client snapshot
    () => false // Server snapshot
  );
}

export default useIsClient;
