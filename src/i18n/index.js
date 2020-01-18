import { Text } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage, languagesResources } from './languageConfig';
import { makeSelectBaseLanguage } from '@redux/translation/selectors';
import { store } from '@redux/store';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => {
    let prevLanguage;
    store.subscribe(() => {
      const selector = makeSelectBaseLanguage(store.getState());
      const baseLanguage = selector;
      if (baseLanguage !== prevLanguage) {
        prevLanguage = baseLanguage;
        cb(baseLanguage);
      }
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
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
