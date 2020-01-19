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
});

export default styles;
