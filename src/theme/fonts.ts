import { createFont } from 'tamagui';

const genericFontSizes = {
  1: 10,
  2: 11,
  3: 12,
  4: 14,
  5: 15,
  6: 16,
  7: 20,
  8: 22,
  9: 30,
  10: 42,
  11: 52,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 124,
  true: 16,
} as const;

const latoFont = createFont({
  family: 'Lato, sans-serif',
  size: genericFontSizes,
  lineHeight: {
    3: 17,
    4: 22,
    5: 25,
  },
  weight: {
    1: '100',
    3: '300',
    4: '400',
    7: '700',
    9: '900',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 5,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  // these will be used when run in native mode
  face: {
    100: { normal: 'Lato-Thin', italic: 'Lato-ThinItalic' },
    300: { normal: 'Lato-Light', italic: 'Lato-LightItalic' },
    400: { normal: 'Lato-Regular', italic: 'Lato-Italic' },
    700: { normal: 'Lato-Bold', italic: 'Lato-BoldItalic' },
    900: { normal: 'Lato-Black', italic: 'Lato-BlackItalic' },
  },
});

export { genericFontSizes, latoFont };
