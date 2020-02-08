import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '@redux/reducers';
import rootSaga from '@redux/rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: null,
  whitelist: [],
};

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    // This is needed because redux-persist will prompt an error.  Redux-persist is using default redux configuration and redux-starter-kit is waiting for a string.
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  sagaMiddleware,
];

// Setup Reducers
const persistedReducer = persistCombineReducers(persistConfig, reducers);

// Create Store
const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

// Start rootSaga
sagaMiddleware.run(rootSaga);

// Setup Store persistence
const persistor = persistStore(store, null);

export { store, persistor };
