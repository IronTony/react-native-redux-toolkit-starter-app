import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import { getTheme, StyleProvider } from 'native-base';
import { store, persistor } from '@redux/store';
import Splashscreen from '@components/Splashscreen';
import AppContainer from '@routes';
import '@i18n';

enableScreens();

const App = () => (
  <StyleProvider style={getTheme()}>
    <Provider store={store}>
      <PersistGate loading={<Splashscreen />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  </StyleProvider>
);

export default App;
