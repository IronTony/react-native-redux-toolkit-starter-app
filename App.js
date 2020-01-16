import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@redux/store';
import Homepage from '@scenes/Home';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Homepage />
    </PersistGate>
  </Provider>
);

export default App;
