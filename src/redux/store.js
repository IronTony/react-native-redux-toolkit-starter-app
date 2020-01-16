import { Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '@redux/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: null,
  whitelist: [],
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const enhancers =
  Platform.OS === 'ios'
    ? composeWithDevTools(applyMiddleware())
    : applyMiddleware();
const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store, null);

export { store, persistor };
