import { shorthands } from '@tamagui/shorthands';
import { themes } from '@tamagui/themes';
import { createTamagui } from 'tamagui';
import { animations } from './animations';
import { customTokens } from './colors';
import { latoFont } from './fonts';

const config = createTamagui({
  animations,
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  fonts: {
    heading: latoFont,
    body: latoFont,
  },
  shorthands,
  themes,
  tokens: customTokens,
});

export type AppConfig = typeof config;

export default config;
