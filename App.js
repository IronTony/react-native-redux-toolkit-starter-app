import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useScreens } from 'react-native-screens';
import { store, persistor } from '@redux/store';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import AppContainer from '@routes';
import { MaterialIconsPack } from '@components/IconAdapter/material-icons';
import { IoniconsIconsPack } from '@components/IconAdapter/ionicons-icons';
import '@i18n';

// eslint-disable-next-line react-hooks/rules-of-hooks
useScreens();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IconRegistry
        icons={[
          MaterialIconsPack,
          IoniconsIconsPack,
          /* , AnotherIconPackDefined*/
        ]}
      />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <AppContainer />
      </ApplicationProvider>
    </PersistGate>
  </Provider>
);

export default App;
