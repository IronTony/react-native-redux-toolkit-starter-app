import theme from '@theme';
import { Flex } from 'native-base';
import * as React from 'react';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import styles from './styles';

interface ICLoader {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  fullPage?: boolean;
}

const CLoader: FC<ICLoader> = ({ color = theme.colors.SUN_FLOWER, size = 40, style = {}, fullPage = false }) => {
  return (
    <Flex flex={1} justifyContent="center" alignItems="center" style={[fullPage && styles.fullPageLoader, style]}>
      <MaterialIndicator color={color} size={size} />
    </Flex>
  );
};

export default CLoader;
