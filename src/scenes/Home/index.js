import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import { getUserInfoRequest, setLocale } from '@redux/actions';
import { selectUserInfo } from '@redux/user/selectors';
import styles from './styles';

function Home() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);

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
      <Button onPress={() => dispatch(setLocale('it'))} title="Italian" />
      <Button onPress={() => dispatch(setLocale('en'))} title="English" />
    </View>
  );
}

export default React.memo(withTranslation()(Home));
