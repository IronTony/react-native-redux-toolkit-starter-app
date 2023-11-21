import { palette } from '@theme/colors';
import * as React from 'react';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { XStack } from 'tamagui';
import styles from './styles';

interface ICLoader {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  fullPage?: boolean;
}

const CLoader: FC<ICLoader> = ({ color = palette.sun_flower, size = 40, style = {}, fullPage = false }) => {
  return (
    <XStack flex={1} justifyContent="center" alignItems="center" style={[fullPage && styles.fullPageLoader, style]}>
      <MaterialIndicator color={color} size={size} />
    </XStack>
  );
};

export default CLoader;
