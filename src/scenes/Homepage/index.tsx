import React, { useCallback, FC, memo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@ui-kitten/components';
import EnvInfoView from '@components/AppVersion';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
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
    <NHCSafeAreaView>
      <GenericHeader BodyHeader={<Icon pack="FontAwesome5" name="react" style={styles.headerIconContent} />} />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.mainText}>{t('Homepage:welcome')}</Text>
        <Trans style={styles.subText} i18nKey="Homepage:releasedWithLove" />

        <View style={styles.languangeContainer}>
          <Button
            onPress={switchLocaleToIt}
            style={styles.button}
            status={currentLocale === 'it' ? 'success' : 'primary'}
            children={() => <Text style={styles.buttonText}>{t('common:italian')}</Text>}
          />

          <Button
            onPress={switchLocaleToEn}
            style={styles.button}
            status={currentLocale === 'en' ? 'success' : 'primary'}
            children={() => <Text style={styles.buttonText}>{t('common:english')}</Text>}
          />
        </View>

        <View style={styles.buttonGoToContainer}>
          <Button
            onPress={() => navigation.navigate('Main', { screen: 'OtherPage' })}
            style={styles.navigationButton}
            children={() => (
              <>
                <Icon pack="EvilIcons" name="arrow-right" style={styles.iconContent} />
                <Text style={styles.buttonText}>{t('Homepage:goToAnotherPage')}</Text>
              </>
            )}
          />

          <Button
            style={styles.navigationButtonBordered}
            onPress={() => navigation.navigate('MyModal')}
            children={() => <Text style={styles.navigationButtonBorderedText}>{t('Homepage:openModal')}</Text>}
          />
        </View>

        <EnvInfoView />
      </ScrollView>
    </NHCSafeAreaView>
  );
};

export default memo(Home);
