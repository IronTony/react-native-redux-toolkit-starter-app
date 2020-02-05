import produce, { Draft } from 'immer';
import { AnyAction, Action, Reducer } from 'redux';
import {
  all,
  spawn,
  takeEvery,
  takeLatest,
  ActionPattern,
} from 'redux-saga/effects';

import {
  Diff,
  IsAny,
  IfMaybeUndefined,
  IsUnknownOrNonInferrable,
  IfVoid,
} from './tsHelpers';

// createAction utility func is ported from '@reduxjs/toolkit'
//  see original source here: https://github.com/reduxjs/redux-toolkit/blob/master/src/createAction.ts#L270

/**
 * An action with a string type and an associated payload.
 * This is the type of action returned by `createAction()` action creators.
 *
 * @template P The type of the action's payload.
 * @template T the type used for the action type.
 *
 * @public
 */
export type PayloadAction<P = void, T extends string = string> = {
  payload: P;
  type: T;
};

/**
 * Basic type for all action creators.
 *
 * @inheritdoc {redux#ActionCreator}
 */
interface BaseActionCreator<P, T extends string> {
  type: T;
  match(action: Action<unknown>): action is PayloadAction<P, T>;
}

/**
 * An action creator of type `T` that takes an optional payload of type `P`.
 *
 * @inheritdoc {redux#ActionCreator}
 *
 * @public
 */
export interface ActionCreatorWithOptionalPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  /**
   * Calling this {@link redux#ActionCreator} without arguments will
   * return a {@link PayloadAction} of type `T` with a payload of `undefined`
   */
  (payload?: undefined): PayloadAction<undefined, T>;
  /**
   * Calling this {@link redux#ActionCreator} with an argument will
   * return a {@link PayloadAction} of type `T` with a payload of `P`
   */
  <PT extends Diff<P, undefined>>(payload?: PT): PayloadAction<PT, T>;
}

/**
 * An action creator of type `T` that takes no payload.
 *
 * @inheritdoc {redux#ActionCreator}
 *
 * @public
 */
export interface ActionCreatorWithoutPayload<T extends string = string>
  extends BaseActionCreator<undefined, T> {
  /**
   * Calling this {@link redux#ActionCreator} will
   * return a {@link PayloadAction} of type `T` with a payload of `undefined`
   */
  (): PayloadAction<undefined, T>;
}

/**
 * An action creator of type `T` that requires a payload of type P.
 *
 * @inheritdoc {redux#ActionCreator}
 *
 * @public
 */
export interface ActionCreatorWithPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  /**
   * Calling this {@link redux#ActionCreator} with an argument will
   * return a {@link PayloadAction} of type `T` with a payload of `P`
   * If possible, `P` will be narrowed down to the exact type of the payload argument.
   */
  <PT extends P>(payload: PT): PayloadAction<PT, T>;
  /**
   * Calling this {@link redux#ActionCreator} with an argument will
   * return a {@link PayloadAction} of type `T` with a payload of `P`
   */
  (payload: P): PayloadAction<P, T>;
}

/**
 * An action creator of type `T` whose `payload` type could not be inferred. Accepts everything as `payload`.
 *
 * @inheritdoc {redux#ActionCreator}
 *
 * @public
 */
export interface ActionCreatorWithNonInferrablePayload<
  T extends string = string
> extends BaseActionCreator<unknown, T> {
  /**
   * Calling this {@link redux#ActionCreator} with an argument will
   * return a {@link PayloadAction} of type `T` with a payload
   * of exactly the type of the argument.
   */
  <PT extends unknown>(payload: PT): PayloadAction<PT, T>;
}

/**
 * An action creator that produces actions with a `payload` attribute.
 *
 * @typeParam P the `payload` type
 * @typeParam T the `type` of the resulting action
 *
 * @public
 */
export type PayloadActionCreator<P = void, T extends string = string> = IsAny<
  P,
  ActionCreatorWithPayload<any, T>,
  IsUnknownOrNonInferrable<
    P,
    ActionCreatorWithNonInferrablePayload<T>,
    // else
    IfVoid<
      P,
      ActionCreatorWithoutPayload<T>,
      // else
      IfMaybeUndefined<
        P,
        ActionCreatorWithOptionalPayload<P, T>,
        // else
        ActionCreatorWithPayload<P, T>
      >
    >
  >
>;

/**
 * A utility function to create an action creator for the given action type
 * string. The action creator accepts a single argument, which will be included
 * in the action object as a field called payload. The action creator function
 * will also have its toString() overriden so that it returns the action type,
 * allowing it to be used in reducer logic that is looking for that action type.
 *
 * @param type The action type to use for created actions.
 *
 * @public
 */
export function createAction<P = void, T extends string = string>(
  type: T,
): PayloadActionCreator<P, T> {
  function actionCreator(payload) {
    return {
      type,
      payload,
    };
  }

  actionCreator.toString = () => `${type}`;

  actionCreator.type = type;

  actionCreator.match = (action: Action<unknown>): action is PayloadAction =>
    action.type === type;

  return actionCreator;
}

/**
 * Returns the action type of the actions created by the passed
 * `createAction()`-generated action creator (arbitrary action creators
 * are not supported).
 *
 * @param action The action creator whose action type to get.
 * @returns The action type used by the action creator.
 *
 * @public
 */
export function getType<T extends string>(
  actionCreator: PayloadActionCreator<any, T>,
): T {
  return `${actionCreator}` as T;
}

// createReducer utility func is ported from '@reduxjs/toolkit'
//  see original source here: https://github.com/reduxjs/redux-toolkit/blob/master/src/createReducer.ts#L96

/**
 * Defines a mapping from action types to corresponding action object shapes.
 *
 * @deprecated This should not be used manually - it is only used for internal
 *             inference purposes and should not have any further value.
 *             It might be removed in the future.
 * @public
 */
export type Actions<T extends keyof any = string> = Record<T, Action>;

/**
 * An *case reducer* is a reducer function for a specific action type. Case
 * reducers can be composed to full reducers using `createReducer()`.
 *
 * Unlike a normal Redux reducer, a case reducer is never called with an
 * `undefined` state to determine the initial state. Instead, the initial
 * state is explicitly specified as an argument to `createReducer()`.
 *
 * In addition, a case reducer can choose to mutate the passed-in `state`
 * value directly instead of returning a new state. This does not actually
 * cause the store state to be mutated directly; instead, thanks to
 * [immer](https://github.com/mweststrate/immer), the mutations are
 * translated to copy operations that result in a new state.
 *
 * @public
 */
export type CaseReducer<S = any, A extends Action = AnyAction> = (
  state: Draft<S>,
  action: A,
) => S | void;

/**
 * A mapping from action types to case reducers for `createReducer()`.
 *
 * @deprecated This should not be used manually - it is only used
 *             for internal inference purposes and using it manually
 *             would lead to type erasure.
 *             It might be removed in the future.
 * @public
 */
export type CaseReducers<S, AS extends Actions> = {
  [T in keyof AS]: AS[T] extends Action ? CaseReducer<S, AS[T]> : void;
};

/**
 * A utility function that allows defining a reducer as a mapping from action
 * type to *case reducer* functions that handle these action types. The
 * reducer's initial state is passed as the first argument.
 *
 * The body of every case reducer is implicitly wrapped with a call to
 * `produce()` from the [immer](https://github.com/mweststrate/immer) library.
 * This means that rather than returning a new state object, you can also
 * mutate the passed-in state object directly; these mutations will then be
 * automatically and efficiently translated into copies, giving you both
 * convenience and immutability.
 *
 * @param initialState The initial state to be returned by the reducer.
 * @param actionsMap A mapping from action types to action-type-specific
 *   case reducers.
 *
 * @public
 */
export function createReducer<
  S,
  CR extends CaseReducers<S, any> = CaseReducers<S, any>
>(initialState: S, actionsMap: CR): Reducer<S> {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const caseReducer = actionsMap[action.type];
      return caseReducer ? caseReducer(draft, action) : undefined;
    });
  };
}

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
export function createLatestSagas<
  AP extends ActionPattern,
  Fn extends (...args: any[]) => any
>(sagasMap: Record<AP, Fn>, moduleName: string = ''): IterableIterator<void> {
  // Extract action patterns from supplied map
  const actionPatterns = Object.keys(sagasMap);

  // Return moduleSaga
  return function* moduleSaga() {
    yield all(
      actionPatterns.map(actionPattern =>
        spawn(function*() {
          while (true) {
            try {
              yield takeLatest<AP, Fn>(actionPattern, sagasMap[actionPattern]);
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
export function createEverySagas<
  AP extends ActionPattern,
  Fn extends (...args: any[]) => any
>(sagasMap: Record<AP, Fn>, moduleName: string = ''): IterableIterator<void> {
  // Extract action patterns from supplied map
  const actionPatterns = Object.keys(sagasMap);

  // Return moduleSaga
  return function* moduleSaga() {
    yield all(
      actionPatterns.map(actionPattern =>
        spawn(function*() {
          while (true) {
            try {
              yield takeEvery<AP, Fn>(actionPattern, sagasMap[actionPattern]);
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
