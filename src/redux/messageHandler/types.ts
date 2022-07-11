export type messageHandlerPayload = {
  status: 'info' | 'warning' | 'success' | 'error';
  message: string;
};
