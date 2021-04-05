import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  toReactElement: (props) => MaterialIcon({ name, ...props }),
});

const MaterialIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

export const MaterialIconsPack = {
  name: 'MaterialIcons',
  icons: createIconsMap(),
};
