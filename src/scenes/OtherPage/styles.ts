import { StyleSheet } from 'react-native';
import { COLORS } from '@theme/colors';
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
  mainText: {
    color: COLORS.TEXT.PRIMARY,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  languangeContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 8,
  },
  buttonText: {
    fontFamily: fonts.regular,
  },
});

export default styles;
