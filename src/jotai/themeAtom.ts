import { Appearance, type ColorSchemeName as SystemTheme } from 'react-native';
import { atomWithStorage } from 'jotai/utils';

import { asyncStorage } from './asyncStorage';

export type ThemeValue = Exclude<SystemTheme, undefined>;

export const systemThemeAtom = atomWithStorage<SystemTheme>(
  'system-theme2',
  Appearance.getColorScheme(),
  asyncStorage,
  {
    getOnInit: true,
  },
);

export const themeAtom = atomWithStorage<ThemeValue>(
  'theme2',
  null,
  asyncStorage,
  {
    getOnInit: true,
  },
);
