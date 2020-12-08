import { StyleSheet } from 'react-native';
import { COLORS } from '@theme/colors';
import { fonts } from '@theme/fonts';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: COLORS.HEADER.BACKGROUND,
  },
  backButtonContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  backButtonStyle: {
    color: COLORS.HEADER.HEADER_TEXT,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  backButtonIcon: {
    color: COLORS.HEADER.HEADER_TEXT,
    marginRight: 8,
    fontSize: 20,
  },
  bodyContainer: {
    alignItems: 'center',
    flex: 1,
  },
  mainPageTitle: {
    flex: 0,
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;
