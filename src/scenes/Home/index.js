import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getUserInfoRequest } from '@redux/actions';
import { makeSelectUser } from '@redux/user/selectors';
import styles from './styles';

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
      <Text
        style={styles.mainText}
      >{`Welcome to your Homepage of the ${userData.name} ${userData.surname}`}</Text>
    </View>
  );
}

export default React.memo(connect(null, null)(Home));
