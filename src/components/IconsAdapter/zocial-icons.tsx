import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Zocial';

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
  toReactElement: (props) => ZocialIcon({ name, ...props }),
});

const ZocialIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

export const ZocialIconsPack = {
  name: 'Zocial',
  icons: createIconsMap(),
};
