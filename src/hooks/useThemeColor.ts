import { type ColorValue } from 'react-native';

import type { ColorName } from '~/components/ThemedText';

import { Colors } from '~/theme';
import useTheme from './useTheme';

export type ColorProp = ColorName | { light: ColorValue; dark: ColorValue };

const useThemeColor = (color: ColorProp) => {
  const theme = useTheme();
  const themeColor =
    typeof color === 'string' ? Colors[theme][color] : color[theme];

  return themeColor;
};

export default useThemeColor;
