import produce from 'immer';

// createAction utility func is ported from '@reduxjs/toolkit'
//  see original source here: https://github.com/reduxjs/redux-toolkit/blob/master/src/createAction.ts#L270

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
export function createAction(type) {
  function actionCreator(payload) {
    return {
      type,
      payload,
    };
  }

  actionCreator.toString = () => `${type}`;

  actionCreator.type = type;

  actionCreator.match = action => action.type === type;

  return actionCreator;
}

// createReducer utility func is ported from '@reduxjs/toolkit'
//  see original source here: https://github.com/reduxjs/redux-toolkit/blob/master/src/createReducer.ts#L96

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
 * @param initialState The initial state to be returned by the reducer.
 * @param actionsMap A callback that receives a *builder* object to define
 *   case reducers via calls to `builder.addCase(actionCreatorOrType, reducer)`.
 *
 * @public
 */
export function createReducer(initialState, actionsMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const caseReducer = actionsMap[action.type];
      return caseReducer ? caseReducer(draft, action) : undefined;
    });
  };
}
