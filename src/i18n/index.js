import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage, languagesResources } from './languageConfig';

const LOCALE_PERSISTENCE_KEY = 'app_locale';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  cacheUserLanguage: locale => {
    AsyncStorage.setItem(LOCALE_PERSISTENCE_KEY, locale);
  },
  detect: cb => {
    AsyncStorage.getItem(LOCALE_PERSISTENCE_KEY)
      .then(locale => {
        if (!locale) {
          return Promise.reject();
        }

        cb(locale);
      })
      .catch(() => {
        console.log('Failed to retrieve stored locale!');
        console.log('Will use defaultLanguage:', defaultLanguage);

        cb(defaultLanguage);
      });
  },
};

i18n
  .use(languageDetector)
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
      wait: true,
      defaultTransParent: Text,
      transSupportBasicHtmlNodes: false,
    },
  });

export default i18n;
