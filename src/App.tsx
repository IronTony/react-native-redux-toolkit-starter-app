import Splashscreen from '@components/Splashscreen';
import '@i18n';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from '@redux/store';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import customTheme from '@theme';
import { NativeBaseProvider } from 'native-base';
import React, { FC, Suspense, useEffect } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import InnerApp from './InnerApp';

enableScreens();

const App: FC = () => {
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Suspense fallback={<Splashscreen />}>
      <Provider store={store}>
        <PersistGate loading={<Splashscreen />} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <NativeBaseProvider theme={customTheme}>
                <InnerApp />
              </NativeBaseProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
};

export default App;
