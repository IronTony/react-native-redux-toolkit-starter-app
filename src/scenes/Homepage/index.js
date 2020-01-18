import React, { useContext, useEffect } from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContext } from 'react-navigation';
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
      <Button
        onPress={() => dispatch(setLocale('it'))}
        title={t('Homepage:italian')}
      />
      <Button
        onPress={() => dispatch(setLocale('en'))}
        title={t('Homepage:english')}
      />

      <View>
        <Button
          onPress={() => navigation.navigate('AnotherPage')}
          title={t('Homepage:goToAnotherPage')}
        />
      </View>
    </View>
  );
}

export default React.memo(withTranslation()(Home));
