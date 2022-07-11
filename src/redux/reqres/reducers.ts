import { createReducer } from '@reduxjs/toolkit';
import {
  getUserDetailsFailed,
  getUserDetailsRequest,
  getUserDetailsSuccess,
  getUsersListFailed,
  getUsersListRequest,
  getUsersListSuccess,
} from './actions';
import { User } from './types';

export interface UsersState {
  usersList: {
    loading: boolean;
    users: User[];
    page: number;
    total: number | undefined;
    total_pages: number | undefined;
  };
  userDetails: {
    loading: boolean;
    details: User | null;
  };
}

const initialState: UsersState = {
  usersList: {
    loading: false,
    users: [],
    page: 1,
    total: undefined,
    total_pages: undefined,
  },
  userDetails: {
    loading: false,
    details: null,
  },
};

export const usersReducer = createReducer(initialState, {
  [getUsersListRequest.type]: state => {
    state.usersList.loading = true;
  },
  [getUsersListSuccess.type]: (state, action) => {
    state.usersList.loading = false;
    state.usersList.users = [...state.usersList.users, ...action.payload.data];
    state.usersList.page = action.payload.page;
    state.usersList.total = action.payload.total;
    state.usersList.total_pages = action.payload.total_pages;
  },
  [getUsersListFailed.type]: state => {
    state.usersList.loading = false;
  },
  [getUserDetailsRequest.type]: state => {
    state.userDetails.loading = true;
  },
  [getUserDetailsSuccess.type]: (state, action) => {
    state.userDetails.loading = false;
    state.userDetails.details = action.payload.data;
  },
  [getUserDetailsFailed.type]: state => {
    state.usersList.loading = false;
  },
});
