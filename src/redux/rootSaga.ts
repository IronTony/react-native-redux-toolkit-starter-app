import { fork } from 'redux-saga/effects';

import userSagas from '@redux/user/sagas';

export default function* rootSaga() {
  yield fork(userSagas);
  // yield fork(someModuleSagas);
  // yield fork(someOtherModuleSagas);
}
