import React, { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { getTheme, StyleProvider } from 'native-base';
import { store, persistor } from '@redux/store';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import Splashscreen from '@components/Splashscreen';
import { RootStackScreen } from '@routes';
import '@i18n';

enableScreens();

const App = () => {
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <Suspense fallback={<Splashscreen />}>
      <StyleProvider style={getTheme()}>
        <Provider store={store}>
          <PersistGate loading={<Splashscreen />} persistor={persistor}>
            <NavigationContainer ref={navigationRef}>
              <RootStackScreen />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </StyleProvider>
    </Suspense>
  );
};

export default App;
