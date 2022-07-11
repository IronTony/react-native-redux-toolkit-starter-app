import { extendTheme } from 'native-base';
import palette from './colors';
import typography from './fonts';

const customTheme = extendTheme({
  colors: {
    white: palette.WHITE,
    black: palette.BLACK,
    lightText: palette.WHITE,
    darkText: palette.BLACK,

    primary: palette.EMERALD,
    secondary: palette.ORANGE,
    tertiary: palette.MIDNIGHT_BLUE,

    pageBackground: palette.MIDNIGHT_BLUE,
    headerBackground: palette.WHITE,

    ...palette,
  },

  ...typography,

  config: {
    // Changing initialColorMode to 'light'
    initialColorMode: 'light',
  },
});

export type Theme = typeof customTheme;
export default customTheme;
