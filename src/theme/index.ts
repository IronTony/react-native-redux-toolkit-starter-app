import { palette } from '@theme/colors';
import { StyleSheet } from 'react-native';

const theme = {
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  colors: {
    statusBarBackground: palette.CONCRETE,
    headerBackground: palette.WHITE,
    mainBackground: palette.MIDNIGHT_BLUE,
    backButtonText: palette.BELIZE_HOLE,
    transparent: palette.TRANSPARENT,
    primary: palette.MIDNIGHT_BLUE,
    cardShadow: palette.GREY_SHADOW_7,
  },
  breakpoints: {},
  textVariants: {
    // ButtonText: {
    //   fontSize: 15,
    //   lineHeight: 20,
    //   color: 'contrastText',
    // },
    // @TODO: to be defined
    // header: {
    //   fontFamily: fonts.boldOS,
    //   fontSize: 34,
    //   lineHeight: 42.5,
    //   color: palette.WET_ASPHALT,
    // },
    // subheader: {
    //   fontFamily: fonts.semiBoldOS,
    //   fontWeight: '600',
    //   fontSize: 28,
    //   lineHeight: 36,
    //   color: palette.WET_ASPHALT,
    // },
    // body: {
    //   fontFamily: fonts.regularOS,
    //   fontSize: 16,
    //   lineHeight: 24,
    //   color: palette.WET_ASPHALT,
    // },
  },
};

export const globalStyle = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },
  directionColumm: {
    flexDirection: 'column',
  },
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  fullContainer: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
    flexGrow: 1,
  },
  SafeAreaViewStyle: {
    backgroundColor: theme.colors.headerBackground,
    flex: 1,
  },
  pageContainerStyle: {
    backgroundColor: theme.colors.mainBackground,
  },
});

export type Theme = typeof theme;
export default theme;
