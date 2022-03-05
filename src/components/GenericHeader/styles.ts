import theme from '@theme';
import { fonts } from '@theme/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.headerBackground,
    paddingHorizontal: theme.spacing.lg,
    zIndex: 9999,
  },
  HeaderShadow: {
    elevation: 3,
    shadowColor: theme.colors.cardShadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    zIndex: 1,
  },
  backButtonContainer: {},
  // backButtonStyle: {
  //   color: theme.colors.backButtonText,
  //   fontFamily: fonts.boldOS,
  //   fontSize: 18,
  // },
  backButtonIcon: {
    color: theme.colors.primary,
    marginRight: 8,
    fontSize: 24,
  },
  bodyContainer: {
    alignItems: 'center',
    flex: 1,
  },
  mainPageTitle: {
    color: theme.colors.primary,
    fontFamily: fonts.bold,
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
