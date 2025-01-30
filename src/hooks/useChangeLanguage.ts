import { useCallback, useState } from 'react';
import { I18nManager, NativeModules } from 'react-native';
import { reloadAsync } from 'expo-updates';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import type { SupportedLanguageCode } from '~/jotai/localeAtom';

import { isRtlAtom, languageCodeAtom } from '~/jotai/localeAtom';
import { delay } from '~/utils/delay';

type ChangeLanguageProps = {
  code: SupportedLanguageCode;
  isRtl?: boolean;
};

const useChangeLanguage = () => {
  const setLanguageCode = useSetAtom(languageCodeAtom);
  const setIsRtl = useSetAtom(isRtlAtom);
  const { i18n } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);

  const changeLanguage = useCallback(
    async ({ code, isRtl = false }: ChangeLanguageProps) => {
      setIsProcessing(true);
      await i18n.changeLanguage(code);
      setLanguageCode(code);
      setIsRtl(isRtl);

      if (I18nManager.isRTL !== isRtl) {
        I18nManager.allowRTL(isRtl);
        I18nManager.forceRTL(isRtl);
        await delay(100);
        if (__DEV__) NativeModules.DevSettings.reload();
        else reloadAsync();
      }
      setIsProcessing(false);
    },
    [i18n],
  );

  return { changeLanguage, isProcessing };
};

export default useChangeLanguage;
