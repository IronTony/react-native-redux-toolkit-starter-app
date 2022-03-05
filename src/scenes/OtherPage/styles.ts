import theme from '@theme';
import { palette } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    padding: 15,
  },
  mainText: {
    color: palette.CLOUDS,
    fontFamily: fonts.regular,
    paddingVertical: 10,
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
