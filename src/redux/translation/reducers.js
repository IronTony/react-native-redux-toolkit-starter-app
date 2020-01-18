import { createReducer } from '@utils/redux';
import { setLocale } from './actions';

const initialState = {
  locale: 'en',
};

export default createReducer(initialState, {
  [setLocale]: (state, action) => {
    state.locale = action.payload;
  },
});
