import { palette } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.MIDNIGHT_BLUE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconContent: {
    fontSize: 24,
    marginRight: 10,
  },
  pageTitle: {
    color: palette.ALIZARIN,
    fontFamily: fonts.regular,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default styles;
