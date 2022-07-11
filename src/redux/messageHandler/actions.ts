import { createAction } from '@reduxjs/toolkit';
import type { messageHandlerPayload } from './types';

export const messageHandlerSet = createAction<messageHandlerPayload>('MESSAGE_HANDLER_SET');
export const messageHandlerReset = createAction('MESSAGE_HANDLER_RESET');
