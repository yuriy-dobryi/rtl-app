import { useEffect, useMemo, useState } from 'react';
import { LogBox, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from '@sentry/react-native';

import FontResources from '~/assets/fonts';

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: 'https://d94171ad7eef1f1637a399d234753493@o4509841640259584.ingest.de.sentry.io/4509841642356816',
  sendDefaultPii: true,

  // spotlight: __DEV__,
  beforeSend(event) {
    if (event.exception?.values?.length) {
      event.exception.values = event.exception.values.map(item => ({
        ...item,
        type: `${item.type} ● ${Platform.OS === 'ios' ? '' : '🤖'}`,
      }));
    }
    return event;
  },
});

Sentry.setContext('app', { app_name: Constants.expoConfig?.name });
Sentry.setTag('app_name', Constants.expoConfig?.name);

export const useAppSetup = () => {
  const [loaded] = useFonts(FontResources);
  const [requestsCompleted, setRequestsCompleted] = useState(false);
  const ready = useMemo(
    () => loaded && requestsCompleted,
    [loaded, requestsCompleted],
  );

  const fetchInitialRequests = async () => {
    try {
      await someAsyncRequest();
      await anotherAsyncRequest();
      setRequestsCompleted(true);
    } catch {
      console.error('Error during initial requests:');
      setRequestsCompleted(false);
    }
  };

  useEffect(() => {
    fetchInitialRequests();
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  return { ready };
};

const IGNORED_LOGS = [
  'Non-serializable values were found in the navigation state',
  'Support for defaultProps will be removed from function components in a future major release.',
];
LogBox.ignoreLogs(IGNORED_LOGS);

const someAsyncRequest = async () => {
  return new Promise(resolve => setTimeout(resolve, 100));
};

const anotherAsyncRequest = async () => {
  return new Promise(resolve => setTimeout(resolve, 200));
};
