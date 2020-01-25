import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import { getTheme, StyleProvider } from 'native-base';
import Splashscreen from '@components/Splashscreen';
import '@i18n';
import { store, persistor } from '@redux/store';
import AppContainer from '@routes';

enableScreens();

const App = () => (
  <Suspense fallback={<Splashscreen />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleProvider style={getTheme()}>
          <AppContainer />
        </StyleProvider>
      </PersistGate>
    </Provider>
  </Suspense>
);

export default App;
