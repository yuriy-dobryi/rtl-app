import type { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

import type { Settings } from 'react-native-paper/lib/typescript/core/settings';

import { themeAtom } from '~/jotai/themeAtom';
import icons, { type IconName } from '~/assets/icons';

const paperSettings: Settings = {
  icon: ({ name, color, size }) => {
    if (name in icons) {
      const Icon = icons[name as IconName];
      return <Icon color={color} width={size} height={size} />;
    }
    return null;
  },
  rippleEffectEnabled: true,
};

const ThemedPaperProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useAtomValue(themeAtom);

  return (
    <PaperProvider
      theme={colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme}
      // settings={paperSettings}
    >
      {children}
    </PaperProvider>
  );
};

export default ThemedPaperProvider;
