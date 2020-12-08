import React, { FC, memo, ReactNode } from 'react';
import { Body, Button, Header, Icon, Left, Right, Text } from 'native-base';
import { Trans } from 'react-i18next';
import { COLORS } from '@theme/colors';
import styles from './styles';

interface IGenericHeader {
  BodyHeader?: ReactNode;
  LeftAction?: ReactNode;
  pageName?: string;
  RightAction?: ReactNode;
  onBackClicked?: () => void;
}

const GenericHeader: FC<IGenericHeader> = ({ BodyHeader, LeftAction, pageName, RightAction, onBackClicked }) => {
  return (
    <Header androidStatusBarColor={COLORS.BAR_COLOR} style={styles.headerContainer}>
      <Left style={styles.flex1}>
        {/*
          The GenericHeader component accepts an onBackClicked prop.
          The route where you want to go is specified in the import of this Header in your scene component
        */}
        {!!onBackClicked && (
          <Button onPress={onBackClicked} style={styles.backButtonContainer} transparent>
            <Icon
              type="SimpleLineIcons"
              // Ionicons icon is the default
              name="arrow-left"
              style={styles.backButtonIcon}
            />
            <Trans style={styles.backButtonStyle} i18nKey="Header:back" />
          </Button>
        )}
        {/*
          You can also pass a custom component defined in you scene component for the left section of the Header
         */}
        {LeftAction}
      </Left>

      <Body style={styles.bodyContainer}>
        {/*
          You can pass the page name or a component that will be rendered in the middle of your Header
         */}
        {!!pageName && <Text style={styles.mainPageTitle}>{pageName}</Text>}
        {BodyHeader}
      </Body>

      <Right style={styles.flex1}>
        {/*
          You can also pass a custom component defined in you scene component for the right section of the Header
         */}
        {RightAction}
      </Right>
    </Header>
  );
};

export default memo(GenericHeader);
