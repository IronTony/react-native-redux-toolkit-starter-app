import React, { useCallback, useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import { NavigationContext } from '@react-navigation/native';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const ModalPage = () => {
  const [t] = useTranslation();
  const navigation = useContext(NavigationContext);

  const goBack = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Container style={styles.container}>
      <GenericHeader
        RightAction={
          <TouchableOpacity onPress={() => goBack()}>
            <Icon
              type="Ionicons"
              name="md-close"
              style={styles.headerIconContent}
            />
          </TouchableOpacity>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <Text style={styles.mainText}>{t('ModalPage:thisIsAModal')}</Text>
      </Content>
    </Container>
  );
};

export default ModalPage;
