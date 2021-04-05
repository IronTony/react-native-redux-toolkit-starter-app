import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const createIconsMap = () => {
  return new Proxy(
    {},
    {
      get(_target, name) {
        return IconProvider(name);
      },
    },
  );
};

const IconProvider = (name) => ({
  toReactElement: (props) => FontistoIcon({ name, ...props }),
});

const FontistoIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

export const FontistoIconsPack = {
  name: 'Fontisto',
  icons: createIconsMap(),
};
