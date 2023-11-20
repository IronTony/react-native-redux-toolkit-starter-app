import { palette } from '@theme/colors';
import React, { FC, memo, ReactNode } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, XStack } from 'tamagui';
import styles from './styles';

interface IGenericHeader {
  BodyHeader?: ReactNode;
  LeftAction?: ReactNode;
  title?: string;
  RightAction?: ReactNode;
  onBackClicked?: () => void;
  style?: StyleProp<ViewStyle>;
  subtitle?: string;
  withShadow?: boolean;
}

const GenericHeader: FC<IGenericHeader> = ({
  BodyHeader,
  LeftAction,
  title,
  RightAction,
  onBackClicked,
  style = {},
  subtitle = undefined,
  withShadow = false,
}) => {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      style={[style, styles.headerContainer, withShadow && styles.HeaderShadow]}
      height={40}
      width="100%">
      <XStack alignItems="center">
        {/*
            The GenericHeader component accepts an onBackClicked prop.
            The route where you want to go is specified in the import of this Header in your scene component
          */}
        {!!onBackClicked && (
          <Pressable onPress={onBackClicked}>
            <Ionicons name="arrow-back" color={palette.midnight_blue} size={12} />
            {/* <Text style={styles.backButtonStyle} >{t('Header:back')}</Text> */}
          </Pressable>
        )}
        {/*
            You can also pass a custom component defined in you scene component for the left section of the Header
          */}
        {LeftAction}
      </XStack>

      <XStack alignItems="center" width="100%">
        {/*
            You can pass the page name or a component that will be rendered in the middle of your Header
          */}

        {!!title && (
          <Text
            color="$midnight_blue"
            fontSize="$4"
            fontFamily="$body"
            fontWeight="500"
            textAlign="center"
            width={220}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
        )}
        {!subtitle ? <></> : <Text>{subtitle}</Text>}
        {BodyHeader}
      </XStack>

      <XStack>
        {/*
            You can also pass a custom component defined in you scene component for the right section of the Header
          */}

        {RightAction}
      </XStack>
    </XStack>
  );
};

export default memo(GenericHeader);
