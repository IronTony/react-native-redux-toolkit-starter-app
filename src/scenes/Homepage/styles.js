import { StyleSheet } from 'react-native';
import { COLORS } from '@theme/colors';
import { fonts } from '@theme/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
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
  },
});

export default styles;
