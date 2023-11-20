import { palette } from '@theme/colors';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fullPageLoader: {
    backgroundColor: palette.black_opacity_7,
    ...Platform.select({
      ios: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 99,
      },
      android: {
        // Hackfix for elevation
        bottom: 0,
        elevation: 4,
        height: '101%',
        left: -5,
        opacity: 1,
        position: 'absolute',
        top: -5,
        width: '103%',
        // /Hackfix for elevation
      },
    }),
  },
});

export default styles;
