import { useEffect, useRef, useState } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';

const useAppState = () => {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const [isOpenedFromBackground, setIsOpenedFromBackground] = useState(false);

  useEffect(() => {
    const handleAppStateChange = (newAppState: AppStateStatus) => {
      const wasOpenedFromBackground =
        (appStateRef.current.match(/inactive|background/) &&
          newAppState === 'active') ||
        false;

      setIsOpenedFromBackground(wasOpenedFromBackground);
      appStateRef.current = newAppState;
    };

    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      listener.remove();
    };
  }, []);

  return { isOpenedFromBackground };
};

export default useAppState;
