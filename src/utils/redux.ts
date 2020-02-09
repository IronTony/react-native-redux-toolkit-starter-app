import { PayloadActionCreator, PayloadAction } from '@reduxjs/toolkit';
import { all, spawn, takeEvery, takeLatest } from 'redux-saga/effects';

// createLatestSagas
//  Returned rootSaga is inspired by code at https://redux-saga.js.org/docs/advanced/RootSaga.html

/**
 * A utility function that allows defining a saga as a mapping from action
 * type to takeLatest sagas that handle these action types.
 *
 * @param sagasMap A callback that receives a *builder* object to define the sagas.
 * @param moduleName (optional) A parameter to specify the module the generated sagas belong to.
 *
 * @public
 */
export function createLatestSagas<P = void, T extends string = string>(
  sagasMap: Record<
    PayloadActionCreator<P, T>,
    (action?: PayloadAction<P, T>) => Generator
  >,
  moduleName: string = '',
) {
  // Extract action patterns from supplied map
  const actionPatterns = Object.keys(sagasMap);

  // Return moduleSaga
  return function* moduleSaga() {
    yield all(
      actionPatterns.map(actionPattern =>
        spawn(function*() {
          while (true) {
            try {
              yield takeLatest(actionPattern, sagasMap[actionPattern]);
              break;
            } catch (e) {
              console.log(
                moduleName,
                `Error executing saga for action ${actionPattern}:`,
                e,
              );
            }
          }
        }),
      ),
    );
  };
}

/**
 * A utility function that allows defining a saga as a mapping from action
 * type to takeEvery sagas that handle these action types.
 *
 * @param sagasMap A callback that receives a *builder* object to define the sagas.
 * @param moduleName An optional parameter to specify the module the generated sagas belong to.
 *
 * @public
 */
export function createEverySagas<P = void, T extends string = string>(
  sagasMap: Record<
    PayloadActionCreator<P, T>,
    (action?: PayloadAction<P, T>) => Generator
  >,
  moduleName: string = '',
) {
  // Extract action patterns from supplied map
  const actionPatterns = Object.keys(sagasMap);

  // Return moduleSaga
  return function* moduleSaga() {
    yield all(
      actionPatterns.map(actionPattern =>
        spawn(function*() {
          while (true) {
            try {
              yield takeEvery(actionPattern, sagasMap[actionPattern]);
              break;
            } catch (e) {
              console.log(
                moduleName,
                `Error executing saga for action ${actionPattern}:`,
                e,
              );
            }
          }
        }),
      ),
    );
  };
}
