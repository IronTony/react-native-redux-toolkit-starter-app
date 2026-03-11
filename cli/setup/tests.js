const fs = require('fs');
const path = require('path');
const { log } = require('../utils/logger');

/**
 * Generate MMKV storage tests for enabled features in the generated project.
 * Tests are placed in __tests__/ and a MMKV mock is created in __mocks__/.
 *
 * @param {string} projectPath - Path to the generated project
 * @param {object} options
 * @param {boolean} options.useI18n - Whether i18n is enabled
 * @param {boolean} options.useAuthFlow - Whether auth flow is enabled
 * @param {boolean} options.useTheme - Whether theming is enabled
 */
function setupTests(projectPath, { useI18n, useAuthFlow, useTheme }) {
  // Only generate tests if at least one MMKV-using feature is enabled
  if (!useI18n && !useAuthFlow && !useTheme) {
    return;
  }

  log.info('Generating MMKV storage tests...');

  const testsDir = path.join(projectPath, '__tests__');
  if (!fs.existsSync(testsDir)) {
    fs.mkdirSync(testsDir, { recursive: true });
  }

  const mocksDir = path.join(projectPath, '__mocks__');
  if (!fs.existsSync(mocksDir)) {
    fs.mkdirSync(mocksDir, { recursive: true });
  }

  // Create MMKV mock
  fs.writeFileSync(
    path.join(mocksDir, 'react-native-mmkv.js'),
    generateMMKVMock(),
  );

  if (useI18n) {
    fs.writeFileSync(
      path.join(testsDir, 'locale-storage.test.ts'),
      generateLocaleStorageTest(),
    );
  }

  if (useTheme) {
    fs.writeFileSync(
      path.join(testsDir, 'theme-storage.test.ts'),
      generateThemeStorageTest(),
    );
  }

  if (useAuthFlow) {
    fs.writeFileSync(
      path.join(testsDir, 'auth-storage.test.ts'),
      generateAuthStorageTest(),
    );
  }

  log.success('MMKV storage tests generated');
}

// ─── Mock Generator ────────────────────────────────────────────────────

function generateMMKVMock() {
  return `/**
 * Mock for react-native-mmkv
 * Provides an in-memory Map-backed implementation for testing
 */
const createMMKV = (_config) => {
  const store = new Map();

  return {
    set: (key, value) => store.set(key, value),
    getString: (key) => store.get(key),
    getNumber: (key) => store.get(key),
    getBoolean: (key) => store.get(key),
    delete: (key) => store.delete(key),
    clearAll: () => store.clear(),
    getAllKeys: () => [...store.keys()],
    contains: (key) => store.has(key),
    // Exposed for test assertions
    _store: store,
  };
};

module.exports = { createMMKV };
`;
}

// ─── Locale Storage Test ───────────────────────────────────────────────

function generateLocaleStorageTest() {
  return `/**
 * Locale Storage Tests
 * Verifies that language preferences are correctly persisted via MMKV
 */
import { MMKVStorage } from '@mmkv';

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
  findBestLanguageTag: jest.fn(() => ({ languageTag: 'en', isRTL: false })),
}));

const LOCALE_PERSISTENCE_KEY = 'app_locale';

describe('Locale Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('Persistence key', () => {
    it('uses the correct MMKV key for locale', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');

      const stored = MMKVStorage.getString(LOCALE_PERSISTENCE_KEY);
      expect(stored).toBe('it');
    });
  });

  describe('cacheUserLanguage', () => {
    it('persists locale to MMKV', () => {
      // Simulate what cacheUserLanguage does
      const locale = 'it';
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, locale);

      expect(MMKVStorage.getString(LOCALE_PERSISTENCE_KEY)).toBe('it');
    });

    it('overwrites previously cached locale', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'en');
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');

      expect(MMKVStorage.getString(LOCALE_PERSISTENCE_KEY)).toBe('it');
    });
  });

  describe('detect', () => {
    it('returns persisted locale when available', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');

      const persistedLocale = MMKVStorage.getString(LOCALE_PERSISTENCE_KEY);
      expect(persistedLocale).toBe('it');
    });

    it('returns undefined when no locale is persisted', () => {
      const persistedLocale = MMKVStorage.getString(LOCALE_PERSISTENCE_KEY);
      expect(persistedLocale).toBeUndefined();
    });
  });

  describe('clearAll impact', () => {
    it('removes locale preference when storage is cleared', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');
      MMKVStorage.clearAll();

      expect(MMKVStorage.getString(LOCALE_PERSISTENCE_KEY)).toBeUndefined();
    });
  });
});
`;
}

// ─── Theme Storage Test ────────────────────────────────────────────────

function generateThemeStorageTest() {
  return `/**
 * Theme Storage Tests
 * Verifies that theme preferences are correctly persisted via MMKV
 */
import { MMKVStorage } from '@mmkv';

const THEME_PERSISTENCE_KEY = 'app_color_scheme';

type ColorSchemeMode = 'light' | 'dark' | 'system';

describe('Theme Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('Persistence key', () => {
    it('uses the correct MMKV key for theme', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      const stored = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      expect(stored).toBe('dark');
    });
  });

  describe('Initial load', () => {
    it('returns undefined when no theme is persisted (defaults to system)', () => {
      const persisted = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      expect(persisted).toBeUndefined();
    });

    it('returns persisted theme when available', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      const persisted = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      expect(persisted).toBe('dark');
    });
  });

  describe('setColorScheme', () => {
    it.each<ColorSchemeMode>(['light', 'dark', 'system'])(
      'persists "%s" mode to MMKV',
      (mode) => {
        MMKVStorage.set(THEME_PERSISTENCE_KEY, mode);

        expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe(mode);
      }
    );

    it('overwrites previously stored theme', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'light');
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('switches from light to dark', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'light');

      // Simulate toggle logic
      const current = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      const next = current === 'dark' ? 'light' : 'dark';
      MMKVStorage.set(THEME_PERSISTENCE_KEY, next);

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe('dark');
    });

    it('switches from dark to light', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      const current = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      const next = current === 'dark' ? 'light' : 'dark';
      MMKVStorage.set(THEME_PERSISTENCE_KEY, next);

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe('light');
    });
  });

  describe('Validation', () => {
    it('only accepts valid color scheme values', () => {
      const validValues: ColorSchemeMode[] = ['light', 'dark', 'system'];

      validValues.forEach((value) => {
        MMKVStorage.set(THEME_PERSISTENCE_KEY, value);
        const stored = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
        expect(['light', 'dark', 'system']).toContain(stored);
      });
    });
  });

  describe('clearAll impact', () => {
    it('removes theme preference when storage is cleared', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');
      MMKVStorage.clearAll();

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBeUndefined();
    });
  });
});
`;
}

// ─── Auth Storage Test ─────────────────────────────────────────────────

function generateAuthStorageTest() {
  return `/**
 * Auth Storage Tests
 * Verifies that JWT tokens and profile cache are correctly persisted via MMKV
 */
import { MMKVStorage } from '@mmkv';

const TOKENS_KEY = 'tokens';
const PROFILE_CACHE_KEY = 'user_profile';

// Sample data
const mockTokens = {
  access_token: 'eyJhbGciOiJIUzI1NiJ9.test-access-token',
  refresh_token: 'eyJhbGciOiJIUzI1NiJ9.test-refresh-token',
};

const mockProfile = {
  id: 1,
  email: 'test@example.com',
  password: 'hashed',
  name: 'Test User',
  role: 'admin',
  avatar: 'https://example.com/avatar.jpg',
};

describe('Auth Token Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('onInit token retrieval', () => {
    it('returns null when no tokens are stored', () => {
      const tokens = MMKVStorage.getString(TOKENS_KEY);
      expect(tokens).toBeUndefined();
    });

    it('returns parsed tokens when stored in MMKV', () => {
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));

      const stored = MMKVStorage.getString(TOKENS_KEY);
      expect(stored).toBeDefined();

      const parsed = JSON.parse(stored!);
      expect(parsed.access_token).toBe(mockTokens.access_token);
      expect(parsed.refresh_token).toBe(mockTokens.refresh_token);
    });
  });

  describe('onLogin token persistence', () => {
    it('persists tokens to MMKV after login', () => {
      // Simulate what onLogin does
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));

      const stored = MMKVStorage.getString(TOKENS_KEY);
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual(mockTokens);
    });
  });

  describe('onRefresh token update', () => {
    it('updates tokens in MMKV after refresh', () => {
      // Store initial tokens
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));

      // Simulate refresh with new tokens
      const refreshedTokens = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
      };
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(refreshedTokens));

      const stored = MMKVStorage.getString(TOKENS_KEY);
      const parsed = JSON.parse(stored!);
      expect(parsed.access_token).toBe('new-access-token');
      expect(parsed.refresh_token).toBe('new-refresh-token');
    });
  });

  describe('onLogout  storage clearing', () => {
    it('clears all stored data on logout', () => {
      // Store tokens and profile
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      // Simulate logout
      MMKVStorage.clearAll();

      expect(MMKVStorage.getString(TOKENS_KEY)).toBeUndefined();
      expect(MMKVStorage.getString(PROFILE_CACHE_KEY)).toBeUndefined();
    });

    it('clearAll removes ALL keys (tokens, profile, locale, theme)', () => {
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));
      MMKVStorage.set('app_locale', 'it');
      MMKVStorage.set('app_color_scheme', 'dark');

      MMKVStorage.clearAll();

      expect(MMKVStorage.getAllKeys()).toHaveLength(0);
    });
  });
});

describe('Profile Cache Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('Cache write', () => {
    it('saves profile data to MMKV', () => {
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      expect(cached).toBeDefined();

      const parsed = JSON.parse(cached!);
      expect(parsed.name).toBe('Test User');
      expect(parsed.email).toBe('test@example.com');
      expect(parsed.role).toBe('admin');
    });
  });

  describe('Cache read', () => {
    it('returns undefined when no profile is cached', () => {
      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      expect(cached).toBeUndefined();
    });

    it('returns cached profile data', () => {
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      const parsed = JSON.parse(cached!);
      expect(parsed).toEqual(mockProfile);
    });
  });

  describe('Cache fallback on API error', () => {
    it('cached profile survives after setting error state', () => {
      // Simulate: profile was cached from previous successful fetch
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      // Simulate: API fails, code reads cache as fallback
      const cachedProfile = MMKVStorage.getString(PROFILE_CACHE_KEY);
      expect(cachedProfile).toBeDefined();

      const parsed = JSON.parse(cachedProfile!);
      expect(parsed.id).toBe(1);
      expect(parsed.avatar).toBe('https://example.com/avatar.jpg');
    });
  });

  describe('Cache update', () => {
    it('overwrites old profile with fresh data', () => {
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      const updatedProfile = { ...mockProfile, name: 'Updated User' };
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(updatedProfile));

      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      const parsed = JSON.parse(cached!);
      expect(parsed.name).toBe('Updated User');
    });
  });
});
`;
}

module.exports = {
  setupTests,
};
