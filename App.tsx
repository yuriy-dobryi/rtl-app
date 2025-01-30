import React, { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '~/i18n';

import { useAppSetup } from '~/hooks/useAppSetup';
import RootNavigation from '~/navigation';
import ThemedPaperProvider from '~/components/Paper/ThemedPaperProvider';
import useSystemLocaleChange from '~/hooks/useSystemLocaleChange';
import useSystemThemeChange from '~/hooks/useSystemThemeChange';

const RootApp = () => {
  const { ready } = useAppSetup();
  useSystemLocaleChange();
  useSystemThemeChange();

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemedPaperProvider>
        <RootNavigation />
      </ThemedPaperProvider>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <RootApp />
    </Suspense>
  );
};

export default App;
