import { palette } from '@theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: palette.white,
    paddingHorizontal: 16,
    zIndex: 9999,
  },
  HeaderShadow: {
    elevation: 3,
    shadowColor: palette.grey_shadow_7,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    zIndex: 1,
  },
  backButtonContainer: {},
  // backButtonStyle: {
  //   color: customTheme.colors.backButtonText,
  //   fontFamily: fonts.boldOS,
  //   fontSize: 18,
  // },
  backButtonIcon: {
    color: palette.peter_river,
    marginRight: 8,
    fontSize: 24,
  },
  bodyContainer: {
    alignItems: 'center',
    flex: 1,
  },
  mainPageTitle: {
    color: palette.peter_river,
    // fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    width: 220,
  },
  BodyContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

export default styles;
