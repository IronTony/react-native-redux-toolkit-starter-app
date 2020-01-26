import React from 'react';
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
  <StyleProvider style={getTheme()}>
    <Provider store={store}>
      <PersistGate loading={<Splashscreen />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  </StyleProvider>
);

export default App;
