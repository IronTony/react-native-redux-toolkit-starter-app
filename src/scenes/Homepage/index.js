import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContext } from 'react-navigation';
import { Button } from '@ui-kitten/components';
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
      <Button onPress={() => dispatch(setLocale('it'))} status="primary">
        {t('Homepage:italian')}
      </Button>
      <Button onPress={() => dispatch(setLocale('en'))} status="basic">
        {t('Homepage:english')}
      </Button>

      <View>
        <Button onPress={() => navigation.navigate('AnotherPage')}>
          {t('Homepage:goToAnotherPage')}
        </Button>
      </View>
    </View>
  );
}

export default React.memo(withTranslation()(Home));
