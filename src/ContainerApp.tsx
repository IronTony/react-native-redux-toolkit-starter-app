import '@i18n';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '@redux/store';
import { navigationRef } from '@routes/utils';
import customTheme from '@theme';
import { NativeBaseProvider } from 'native-base';
import React, { ReactElement, Suspense, useCallback, useEffect } from 'react';
import { Text } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'src/App';

function ContainerApp(): ReactElement {
  const hideBootSplash = useCallback(async () => {
    await RNBootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    hideBootSplash();
  }, [hideBootSplash]);

  return (
    <Suspense fallback="Loading...">
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <NativeBaseProvider theme={customTheme}>
                <App />
              </NativeBaseProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}

export default ContainerApp;
