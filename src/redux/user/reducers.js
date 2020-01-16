import produce from 'immer';

import { GET_USER_INFO } from './types';

const initialState = {
  user: {
    name: 'Name',
    surname: 'Surname',
  },
};

export default produce((draft, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      draft.user = {
        name: 'Awesome',
        surname: 'React Native Starter App',
      };
      return;
  }
}, initialState);
