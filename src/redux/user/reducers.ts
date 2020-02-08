import { createReducer } from '@reduxjs/toolkit';
import { getUserInfoRequest } from './actions';

const initialState = {
  user: {
    name: 'Awesome',
    surname: 'React Native Starter App',
  },
};

export default createReducer(initialState, {
  [getUserInfoRequest as any]: state => {
    state.user = {
      name: 'Marvellous',
      surname: 'React Native Starter App',
    };
  },
});
