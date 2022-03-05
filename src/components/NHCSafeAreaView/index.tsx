import { globalStyle } from '@theme';
import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface ISAW {
  readonly edges?: Edge[];
  areaStyle?: StyleProp<ViewStyle>;
}

const NHCSafeAreaView: FC<ISAW> = ({ children, edges = ['top', 'right', 'left'], areaStyle = {} }) => {
  return (
    <SafeAreaView style={[globalStyle.SafeAreaViewStyle, areaStyle]} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

export default NHCSafeAreaView;
