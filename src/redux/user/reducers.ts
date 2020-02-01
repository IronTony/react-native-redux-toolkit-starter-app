import { createReducer } from '@utils/redux';
import { getUserInfoRequest } from './actions';

const initialState = {
  user: {
    name: 'Awesome',
    surname: 'React Native Starter App',
  },
};

export default createReducer(initialState, {
  // Use the name of the action and put "as any" to avoid Typescript warning
  [getUserInfoRequest as any]: (state, action) => {
    state.user = {
      name: 'Marvellous',
      surname: 'React Native Starter App',
    };
  },
});
