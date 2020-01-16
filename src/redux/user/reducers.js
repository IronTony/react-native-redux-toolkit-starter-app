import { GET_USER_INFO } from './types';

const initialState = {
  user: {
    name: 'Name',
    surname: 'Surname',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        user: {
          name: 'Awesome',
          surname: 'React Native Starter App',
        },
      };

    default:
      return state;
  }
};
