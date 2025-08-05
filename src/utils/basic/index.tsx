import type { TextStyle, StyleProp } from 'react-native';

export const FONTS = {
  '100': 'Heebo-Thin',
  '200': 'Heebo-ExtraLight',
  '300': 'Heebo-Light',
  '400': 'Heebo-Regular',
  '500': 'Heebo-Medium',
  '600': 'Heebo-SemiBold',
  '700': 'Heebo-Bold',
  '800': 'Heebo-ExtraBold',
  '900': 'Heebo-Black',
  normal: 'Heebo-Regular',
} as const;

type FontWeightKey = keyof typeof FONTS;

export const getFontFamily = (style: StyleProp<TextStyle>) => {
  if (!style) return undefined;

  let fontWeight: string | number | undefined;

  if (Array.isArray(style)) {
    const match = style.find(
      el => el && typeof el === 'object' && 'fontWeight' in el,
    );
    fontWeight = match ? (match as TextStyle).fontWeight : undefined;
  } else if (typeof style === 'object' && 'fontWeight' in style) {
    fontWeight = style.fontWeight;
  }

  const fontWeightKey = fontWeight?.toString() as FontWeightKey;
  return fontWeightKey in FONTS ? FONTS[fontWeightKey] : undefined;
};
