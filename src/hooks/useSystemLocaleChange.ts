import { useCallback, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useAtom, useAtomValue } from 'jotai';
import { getLocales } from 'react-native-localize';

import {
  languageCodeAtom,
  SupportedLanguageCode,
  systemLanguageCodeAtom,
} from '~/jotai/localeAtom';
import useAppState from './useAppState';
import useChangeLanguage from './useChangeLanguage';

const useSystemLocaleChange = () => {
  const [systemLanguageCode, setSystemLanguageCode] = useAtom(
    systemLanguageCodeAtom,
  );
  const languageCode = useAtomValue(languageCodeAtom);
  const { changeLanguage } = useChangeLanguage();
  const { isOpenedFromBackground } = useAppState();

  const onCheckLocaleChange = useCallback(async () => {
    const locale = getLocales()[0];
    const hasSystemLanguageChanged =
      systemLanguageCode !== null && systemLanguageCode !== locale.languageCode;
    const showAlert =
      hasSystemLanguageChanged &&
      locale.languageCode !== languageCode &&
      locale.languageCode.toUpperCase() in SupportedLanguageCode;

    setSystemLanguageCode(locale.languageCode);
    if (showAlert) {
      const confirmed = await showLanguageChangeAlert();
      if (confirmed) {
        changeLanguage({
          code: locale.languageCode as SupportedLanguageCode,
          isRtl: locale.isRTL,
        });
      }
    }
  }, [systemLanguageCode, languageCode]);

  const showLanguageChangeAlert = async () =>
    new Promise(resolve => {
      Alert.alert(
        'System Language Changed',
        'Would you like to apply the system language to the app?',
        [
          {
            text: 'No',
            style: 'destructive',
            onPress: () => resolve(false),
          },
          {
            text: 'Yes',
            style: 'default',
            onPress: () => resolve(true),
          },
        ],
      );
    });

  useEffect(() => {
    if (Platform.OS === 'ios') {
      onCheckLocaleChange();
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      onCheckLocaleChange();
    }
  }, [isOpenedFromBackground]);
};

export default useSystemLocaleChange;
