import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import { StackActions, useNavigation } from '@react-navigation/native';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const ModalPage = ({ children, pageTitle }) => {
  const navigation = useNavigation();
  const popAction = StackActions.pop();

  const closeModal = useCallback(() => {
    navigation.dispatch(popAction);
  }, [navigation, popAction]);

  return (
    <Container style={styles.container}>
      <GenericHeader
        BodyHeader={<Text style={styles.pageTitle}>{pageTitle}</Text>}
        RightAction={
          <TouchableOpacity onPress={() => closeModal()}>
            <Icon
              type="Ionicons"
              name="md-close"
              style={styles.headerIconContent}
            />
          </TouchableOpacity>
        }
      />
      <Content contentContainerStyle={styles.content}>{children}</Content>
    </Container>
  );
};

export default ModalPage;
