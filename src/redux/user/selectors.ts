import { createSelector } from '@reduxjs/toolkit';

const userInfoSelector = state => state.user;

export const selectUserInfo = createSelector(
  userInfoSelector,
  userState => userState.user,
);
