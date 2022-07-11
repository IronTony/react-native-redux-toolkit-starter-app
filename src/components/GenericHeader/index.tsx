import { Flex, HStack, Icon, Pressable, Text } from 'native-base';
import React, { FC, memo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <HStack
      alignItems="center"
      justifyContent="space-between"
      // style={[style, styles.headerContainer, withShadow && styles.HeaderShadow]}
      height="40px"
      w="100%">
      <Flex alignItems="center">
        {/*
            The GenericHeader component accepts an onBackClicked prop.
            The route where you want to go is specified in the import of this Header in your scene component
          */}
        {!!onBackClicked && (
          <Pressable onPress={onBackClicked}>
            <Icon as={Ionicons} name="arrow-back" color="MIDNIGHT_BLUE" size="sm" />
            {/* <Text style={styles.backButtonStyle} >{t('Header:back')}</Text> */}
          </Pressable>
        )}
        {/*
            You can also pass a custom component defined in you scene component for the left section of the Header
          */}
        {LeftAction}
      </Flex>

      <Flex>
        {/*
            You can pass the page name or a component that will be rendered in the middle of your Header
          */}

        {!!title && (
          <Text
            color="MIDNIGHT_BLUE"
            fontSize="20px"
            fontFamily="body"
            fontWeight={700}
            lineHeight="24px"
            textAlign="center"
            width="220px"
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
        )}
        {!subtitle ? <></> : <Text>{subtitle}</Text>}
        {BodyHeader}
      </Flex>

      <Flex alignItems="center">
        {/*
            You can also pass a custom component defined in you scene component for the right section of the Header
          */}

        {RightAction}
      </Flex>
    </HStack>
  );
};

export default memo(GenericHeader);
