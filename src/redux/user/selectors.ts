import { createSelector } from 'reselect';

const userInfoSelector = state => state.user;

export const selectUserInfo = createSelector(
  userInfoSelector,
  userState => userState.user,
);
