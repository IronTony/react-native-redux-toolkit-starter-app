import { StyleSheet } from 'react-native';
import { COLORS } from '@theme/colors';
import { fonts } from '@theme/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
    justifyContent: 'center',
  },
  mainText: {
    color: COLORS.TEXT.PRIMARY,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
});

export default styles;
