import theme from '@theme';
import { palette } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 15,
  },
  languangeContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 8,
  },
  mainText: {
    color: palette.WHITE,
    fontFamily: fonts.bold,
    fontSize: 30,
    paddingBottom: 20,
    textAlign: 'center',
  },
  subText: {
    color: palette.WHITE,
    fontFamily: fonts.regular,
    fontSize: 13,
    paddingBottom: 20,
    textAlign: 'center',
  },
  buttonGoToContainer: {
    margin: 10,
  },
  navigationButton: {
    backgroundColor: palette.SUN_FLOWER,
    borderWidth: 0,
    justifyContent: 'center',
  },
  buttonText: {
    color: palette.WHITE,
    fontFamily: fonts.regular,
  },
  iconContent: {
    color: palette.WHITE,
    marginRight: 5,
    fontSize: 20,
  },
  headerIconContent: {
    color: palette.PETER_RIVER,
    fontSize: 35,
  },
  navigationButtonBordered: {
    alignSelf: 'center',
    backgroundColor: palette.TRANSPARENT,
    borderColor: palette.ALIZARIN,
    borderWidth: 1,
    marginTop: 15,
  },
  navigationButtonBorderedText: {
    color: palette.WHITE,
    fontFamily: fonts.regular,
  },
  marginTop10: {
    marginTop: 10,
  },
});

export default styles;
