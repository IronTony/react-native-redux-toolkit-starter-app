import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import { store, persistor } from '@redux/store';
import { getTheme, StyleProvider } from 'native-base';
import AppContainer from '@routes';
import '@i18n';

enableScreens();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyleProvider style={getTheme()}>
        <AppContainer />
      </StyleProvider>
    </PersistGate>
  </Provider>
);

export default App;
