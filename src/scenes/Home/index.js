import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getUserInfoRequest } from '@redux/actions';
import styles from './styles';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Homepage</Text>
    </View>
  );
}

export default Home;
