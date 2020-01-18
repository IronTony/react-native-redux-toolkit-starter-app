import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import { getUserInfoRequest, setLocale } from '@redux/actions';
import { makeSelectUser } from '@redux/user/selectors';
import styles from './styles';
import { COLORS } from '@theme/colors';

function Home() {
  const dispatch = useDispatch();
  const userData = useSelector(makeSelectUser);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Trans
        style={{ color: COLORS.TEXT.PRIMARY }}
        i18nKey="Homepage:welcome"
        values={userData}
      />
      <Button onPress={() => dispatch(setLocale('it'))} title="Italian" />
      <Button onPress={() => dispatch(setLocale('en'))} title="English" />
    </View>
  );
}

export default React.memo(withTranslation()(Home));
