import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
  toReactElement: (props) => SimpleLineIconsIcon({ name, ...props }),
});

const SimpleLineIconsIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

export const SimpleLineIconsIconsPack = {
  name: 'SimpleLineIcons',
  icons: createIconsMap(),
};
