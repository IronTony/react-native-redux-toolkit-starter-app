import { Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '@redux/reducers';
import rootSaga from '@redux/rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: null,
  whitelist: ['translation'],
};

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const multipleApplyMiddleware = applyMiddleware(sagaMiddleware);

// Setup Reducers
const persistedReducer = persistCombineReducers(persistConfig, reducers);

// Setup Enhancers
const enhancers =
  Platform.OS === 'ios'
    ? composeWithDevTools(multipleApplyMiddleware)
    : multipleApplyMiddleware;

// Create Store
const store = createStore(persistedReducer, enhancers);

// Start rootSaga
sagaMiddleware.run(rootSaga);

// Setup Store persistence
const persistor = persistStore(store, null);

export { store, persistor };
