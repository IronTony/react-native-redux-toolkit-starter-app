import React, { useCallback, FC, memo } from 'react';
import { View, ScrollView } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Button, Container, Icon, Text } from 'native-base';
import EnvInfoView from '@components/AppVersion';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const Home: FC = () => {
  const [t, i18n] = useTranslation();

  const navigation = useNavigation();

  const currentLocale = i18n.language;
  const switchLocaleToEn = useCallback(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const switchLocaleToIt = useCallback(() => {
    i18n.changeLanguage('it');
  }, [i18n]);

  return (
    <Container style={styles.container}>
      <GenericHeader BodyHeader={<Icon type="FontAwesome5" name="react" style={styles.headerIconContent} />} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.mainText}>{t('Homepage:welcome')}</Text>
        <Trans style={styles.subText} i18nKey="Homepage:releasedWithLove" />

        <View style={styles.languangeContainer}>
          <Button onPress={switchLocaleToIt} style={styles.button} success={currentLocale === 'it'}>
            <Text style={styles.buttonText}>{t('common:italian')}</Text>
          </Button>

          <Button onPress={switchLocaleToEn} style={styles.button} success={currentLocale === 'en'}>
            <Text style={styles.buttonText}>{t('common:english')}</Text>
          </Button>
        </View>

        <View style={styles.buttonGoToContainer}>
          <Button onPress={() => navigation.navigate('Main', { screen: 'OtherPage' })} style={styles.navigationButton}>
            <Icon type="EvilIcons" name="arrow-right" style={styles.iconContent} />
            <Text style={styles.buttonText}>{t('Homepage:goToAnotherPage')}</Text>
          </Button>

          <Button style={[styles.navigationButtonBordered]} onPress={() => navigation.navigate('MyModal')}>
            <Text style={styles.navigationButtonBorderedText}>{t('Homepage:openModal')}</Text>
          </Button>
        </View>

        <EnvInfoView />
      </ScrollView>
    </Container>
  );
};

export default memo(Home);
