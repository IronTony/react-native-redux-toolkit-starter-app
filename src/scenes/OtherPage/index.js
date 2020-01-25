import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';
import { withNavigation } from 'react-navigation';
import { Button, Container, Content, Text } from 'native-base';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const OtherPage = ({ navigation }) => {
  const [t, i18n] = useTranslation();

  const currentLocale = i18n.language;
  const switchLocaleToEn = useCallback(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const switchLocaleToIt = useCallback(() => {
    i18n.changeLanguage('it');
  }, [i18n]);

  const goBack = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Container style={styles.container}>
      <GenericHeader
        onBackClicked={goBack}
        pageName={t('AnotherPage:OtherPage')}
      />
      <Content contentContainerStyle={styles.content}>
        <View style={styles.container}>
          <Trans style={styles.mainText} i18nKey="AnotherPage:welcome" />
          <View style={styles.languangeContainer}>
            <Button
              onPress={switchLocaleToIt}
              style={styles.button}
              status={currentLocale === 'it' ? 'primary' : 'basic'}
            >
              <Text style={styles.buttonText}>{t('common:italian')}</Text>
            </Button>

            <Button
              onPress={switchLocaleToEn}
              style={styles.button}
              status={currentLocale === 'en' ? 'primary' : 'basic'}
            >
              <Text style={styles.buttonText}>{t('common:english')}</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default React.memo(withNavigation(OtherPage));
