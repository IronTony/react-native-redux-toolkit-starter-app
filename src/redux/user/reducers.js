import { createReducer } from '@utils/redux';
import { getUserInfoRequest } from './actions';

const initialState = {
  user: {
    name: 'Name',
    surname: 'Surname',
  },
};

export default createReducer(initialState, {
  [getUserInfoRequest]: (state, action) => {
    state.user = {
      name: 'Awesome',
      surname: 'React Native Starter App',
    };
  },
});
