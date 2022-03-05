import { Icon, TopNavigation } from '@ui-kitten/components';
import React, { FC, memo, ReactNode } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
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
    <TopNavigation
      alignment="center"
      style={[style, styles.headerContainer, withShadow && styles.HeaderShadow]}
      title={() => (
        <View style={styles.bodyContainer}>
          {/*
            You can pass the page name or a component that will be rendered in the middle of your Header
          */}
          <View style={styles.BodyContent}>
            {!!title && (
              <Text style={styles.mainPageTitle} numberOfLines={1} ellipsizeMode="tail">
                {title}
              </Text>
            )}
            {BodyHeader}
          </View>
        </View>
      )}
      accessoryLeft={() => (
        <View>
          {/*
            The GenericHeader component accepts an onBackClicked prop.
            The route where you want to go is specified in the import of this Header in your scene component
          */}
          {!!onBackClicked && (
            <TouchableOpacity onPress={onBackClicked} style={styles.backButtonContainer}>
              <Icon pack="Ionicons" name="arrow-back" style={styles.backButtonIcon} />
              {/* <Trans style={styles.backButtonStyle} i18nKey="Header:back" /> */}
            </TouchableOpacity>
          )}
          {/*
            You can also pass a custom component defined in you scene component for the left section of the Header
          */}
          {LeftAction}
        </View>
      )}
      accessoryRight={() => (
        <View>
          {/*
            You can also pass a custom component defined in you scene component for the right section of the Header
          */}
          {RightAction}
        </View>
      )}
      subtitle={evaProps => (!subtitle ? <></> : <Text {...evaProps}>{subtitle}</Text>)}
    />
  );
};

export default memo(GenericHeader);
