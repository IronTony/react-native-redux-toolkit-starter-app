import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContext } from 'react-navigation';
import { Button, Container, Content, Icon, Text } from 'native-base';
import { getUserInfoRequest, setLocale } from '@redux/actions';
import { selectUserInfo } from '@redux/user/selectors';
import EnvInfoView from '@components/AppVersion';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const Home = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  return (
    <Container style={styles.container}>
      <GenericHeader
        BodyHeader={
          <Icon
            type="FontAwesome5"
            name="react"
            style={styles.headerIconContent}
          />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <Trans
          style={styles.mainText}
          i18nKey="Homepage:welcome"
          values={userData}
        />
        <Trans style={styles.subText} i18nKey="Homepage:releasedWithLove" />

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

        <View style={styles.buttonGoToContainer}>
          <Button
            onPress={() => navigation.navigate('AnotherPage')}
            style={styles.navigationButton}
          >
            <Icon name="ios-options" style={styles.iconContent} />
            <Text style={styles.buttonText}>
              {t('Homepage:goToAnotherPage')}
            </Text>
          </Button>
        </View>

        <EnvInfoView />
      </Content>
    </Container>
  );
};

export default React.memo(withTranslation()(Home));
