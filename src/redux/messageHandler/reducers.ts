import { createReducer } from '@reduxjs/toolkit';
import { messageHandlerSet, messageHandlerReset } from './actions';

export interface IMessageHandler {
  status: 'info' | 'warning' | 'success' | 'error' | undefined;
  message: string | undefined;
}

const initialState: IMessageHandler = {
  status: undefined,
  message: undefined,
};

const messagesReducer = createReducer(initialState, {
  [messageHandlerSet.type]: (state, action) => {
    state.status = action.payload.status;
    state.message = action.payload.message;
  },
  [messageHandlerReset.type]: state => {
    state.status = undefined;
    state.message = undefined;
  },
});

export default messagesReducer;
