import { StyleSheet } from 'react-native';
import { COLORS } from '@theme/colors';
import { fonts } from '@theme/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    color: COLORS.TEXT.PRIMARY,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  headerIconContent: {
    marginRight: 10,
  },
});

export default styles;
