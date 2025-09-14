import { atomWithStorage } from 'jotai/utils';
import { getLocales } from 'react-native-localize';

import { asyncStorage } from './asyncStorage';

export enum SupportedLanguageCode {
  EN = 'en',
  DE = 'de',
  AR = 'ar',
}

const locale = getLocales()[0];
const isSystemLanguageSupported =
  locale?.languageCode.toUpperCase() in SupportedLanguageCode;

const defaultLanguageCode = isSystemLanguageSupported
  ? (locale.languageCode as SupportedLanguageCode)
  : SupportedLanguageCode.EN;
const defaultIsRtl = isSystemLanguageSupported ? locale.isRTL : false;

export const systemLanguageCodeAtom = atomWithStorage<string | null>(
  'system-language-code2',
  null,
  asyncStorage,
  { getOnInit: true },
);

export const languageCodeAtom = atomWithStorage<SupportedLanguageCode>(
  'language-code2',
  defaultLanguageCode,
  asyncStorage,
  { getOnInit: true },
);

export const isRtlAtom = atomWithStorage<boolean>(
  'is-rtl2',
  defaultIsRtl,
  asyncStorage,
  { getOnInit: true },
);
