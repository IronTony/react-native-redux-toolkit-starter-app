import { StyleSheet } from 'react-native';
// import { getAdjustedFontSize } from '@utils';
import { COLORS } from '@theme/colors';
import { fonts } from '@theme/fonts';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  backButtonContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  backButtonStyle: {
    color: COLORS.HEADER_TEXT,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  backButtonIcon: {
    color: COLORS.HEADER_TEXT,
    marginRight: 8,
  },
  mainPageTitle: {
    flex: 0,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
});

export default styles;
