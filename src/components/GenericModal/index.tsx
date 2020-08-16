import React, { useCallback, FC } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Container, Icon, Text } from 'native-base';
import { StackActions, useNavigation } from '@react-navigation/native';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const ModalPage: FC = ({ children, pageTitle }) => {
  const navigation = useNavigation();
  const popAction = useCallback(() => StackActions.pop(), []);

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
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    </Container>
  );
};

export default ModalPage;
