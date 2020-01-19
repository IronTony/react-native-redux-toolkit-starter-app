import { createReducer } from '@utils/redux';
import { getUserInfoRequest } from './actions';

const initialState = {
  user: {
    name: 'Awesome',
    surname: 'React Native Starter App',
  },
};

export default createReducer(initialState, {
  [getUserInfoRequest]: (state, action) => {
    state.user = {
      name: 'Marvellous',
      surname: 'React Native Starter App',
    };
  },
});
