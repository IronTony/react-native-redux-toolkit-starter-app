import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContext } from 'react-navigation';
import { Button, Icon } from '@ui-kitten/components';
import { getUserInfoRequest, setLocale } from '@redux/actions';
import { selectUserInfo } from '@redux/user/selectors';
import styles from './styles';

function Home() {
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
    <View style={styles.container}>
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
          status="primary"
        >
          {t('common:italian')}
        </Button>
        <Button
          onPress={() => dispatch(setLocale('en'))}
          style={styles.button}
          status="basic"
        >
          {t('common:english')}
        </Button>
      </View>

      <View style={styles.buttonGoToContainer}>
        <Button
          onPress={() => navigation.navigate('AnotherPage')}
          style={styles.navigationButton}
          icon={() => <Icon name="ios-options" pack="ionicons" />}
        >
          {t('Homepage:goToAnotherPage')}
        </Button>
      </View>
    </View>
  );
}

export default React.memo(withTranslation()(Home));
