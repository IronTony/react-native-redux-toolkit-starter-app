import React from 'react';
import PropTypes from 'prop-types';
import { Body, Button, Header, Icon, Left, Right, Text } from 'native-base';
import { Trans } from 'react-i18next';
import { COLORS } from '@theme/colors';
import styles from './styles';

const GenericHeader = ({
  BodyHeader,
  LeftAction,
  pageName,
  RightAction,
  onBackClicked,
}) => {
  return (
    <Header
      androidStatusBarColor={COLORS.BAR_COLOR}
      style={styles.headerContainer}
    >
      <Left style={styles.flex1}>
        {/*
          The GenericHeader component accepts an onBackClicked prop.
          The route where you want to go is specified in the import of this Header in your scene component
        */}
        {!!onBackClicked && (
          <Button
            onPress={onBackClicked}
            style={styles.backButtonContainer}
            transparent
          >
            <Icon
              // Ionicons icon is the default
              name="ios-arrow-back"
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

GenericHeader.propTypes = {
  BodyHeader: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  LeftAction: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  pageName: PropTypes.string,
  RightAction: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onBackClicked: PropTypes.func,
};

GenericHeader.defaultProps = {
  BodyHeader: null,
  LeftAction: null,
  pageName: '',
  RightAction: null,
  onBackClicked: null,
};

export default React.memo(GenericHeader);
