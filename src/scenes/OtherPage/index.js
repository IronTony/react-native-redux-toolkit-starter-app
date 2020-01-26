import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import { Button, Container, Content, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { setLocale } from '@redux/actions';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const OtherPage = ({ navigation }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const goBack = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Container style={styles.container}>
      <GenericHeader
        onBackClicked={() => goBack()}
        pageName={t('AnotherPage:OtherPage')}
      />
      <Content contentContainerStyle={styles.content}>
        <View style={styles.container}>
          <Trans style={styles.mainText} i18nKey="AnotherPage:welcome" />
          <View style={styles.languangeContainer}>
            <Button
              onPress={() => dispatch(setLocale('it'))}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{t('common:italian')}</Text>
            </Button>
            <Button
              onPress={() => dispatch(setLocale('en'))}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{t('common:english')}</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default React.memo(withTranslation()(withNavigation(OtherPage)));
