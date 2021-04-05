import { Text } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage, languagesResources } from './languageConfig';
import RNLanguageDetector from './languageDetector';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: process.env.NODE_ENV === 'development',
    resources: languagesResources,
    // language to use if translations in user language are not available.
    fallbackLng: defaultLanguage,

    ns: ['common'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      useSuspense: true,
      defaultTransParent: Text,
      transSupportBasicHtmlNodes: false,
    },
  });

export default i18n;
