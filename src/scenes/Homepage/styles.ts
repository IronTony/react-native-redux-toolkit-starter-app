import { StyleSheet } from 'react-native';
import { COLORS, PALETTE } from '@theme/colors';
import { fonts } from '@theme/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
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
    color: COLORS.TEXT.PRIMARY,
    fontFamily: fonts.bold,
    fontSize: 30,
    paddingBottom: 20,
    textAlign: 'center',
  },
  subText: {
    color: COLORS.CONTRAST,
    fontFamily: fonts.regular,
    fontSize: 13,
    paddingBottom: 20,
    textAlign: 'center',
  },
  buttonGoToContainer: {
    margin: 10,
  },
  navigationButton: {
    backgroundColor: COLORS.LIGHT,
    borderWidth: 0,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fonts.regular,
  },
  iconContent: {
    marginRight: 0,
  },
  headerIconContent: {
    color: COLORS.HEADER.HEADER_TEXT,
  },
  navigationButtonBordered: {
    alignSelf: 'center',
    backgroundColor: PALETTE.TRANSPARENT,
    borderColor: PALETTE.ALIZARIN,
    borderWidth: 1,
    marginTop: 15,
  },
  navigationButtonBorderedText: {
    color: COLORS.TEXT.SECONDARY,
    fontFamily: fonts.regular,
  },
  marginTop10: {
    marginTop: 10,
  },
});

export default styles;
