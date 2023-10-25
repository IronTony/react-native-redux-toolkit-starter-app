import { mmkvStorage } from '@mmkv';
import { findBestLanguageTag } from 'react-native-localize';
import { defaultLanguage, languagesResources } from './languageConfig';

const LOCALE_PERSISTENCE_KEY = 'app_locale';

const noop = (): void => {
  // Do nothing
};

const RNLanguageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb: (detectedLocale: string) => void): void => {
    try {
      // Retrieve cached locale
      const persistedLocale = mmkvStorage.getString(LOCALE_PERSISTENCE_KEY);

      // If not found, detect from device
      if (!persistedLocale) {
        // Find best available language from the resource ones
        const languageTags = Object.keys(languagesResources);
        const detectedLocale = findBestLanguageTag(languageTags);

        // Return detected locale or default language
        return cb(detectedLocale?.languageTag ?? defaultLanguage);
      }

      cb(persistedLocale);
    } catch {
      console.warn('Failed to detect locale!');
      console.warn('Will use defaultLanguage:', defaultLanguage);

      cb(defaultLanguage);
    }
  },
  init: noop,
  cacheUserLanguage: (locale: string): void => {
    mmkvStorage.set(LOCALE_PERSISTENCE_KEY, locale);
  },
};

export default RNLanguageDetector;
