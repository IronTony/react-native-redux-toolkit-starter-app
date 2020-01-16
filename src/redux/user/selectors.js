import { createSelector } from 'reselect';

const userInfoSelector = state => state.user;

export const makeSelectUser = createSelector(
  userInfoSelector,
  userState => userState.user,
);
