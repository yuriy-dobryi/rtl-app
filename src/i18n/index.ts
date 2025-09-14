import i18n from 'i18next';
import { getDefaultStore } from 'jotai';
import { initReactI18next } from 'react-i18next';

import type { ResourceLanguage } from 'i18next';

import { SupportedLanguageCode, languageCodeAtom } from '~/jotai/localeAtom';
import arabic from './locales/arabic.json';
import english from './locales/english.json';
import german from './locales/german.json';

export type Resources = {
  [language in SupportedLanguageCode]: ResourceLanguage;
};

const resources: Resources = {
  en: { translation: english },
  de: { translation: german },
  ar: { translation: arabic },
};

const initI18n = async () => {
  const store = getDefaultStore();
  const languageCode = await store.get(languageCodeAtom);

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: languageCode,
    fallbackLng: SupportedLanguageCode.EN,
    interpolation: { escapeValue: false },
  });
};

initI18n();
