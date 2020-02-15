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
  headerIconContent: {
    marginRight: 10,
  },
  pageTitle: {
    color: COLORS.TEXT.SECONDARY,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
});

export default styles;
