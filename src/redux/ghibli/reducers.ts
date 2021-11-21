import { createReducer } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { getAllFilmsFailed, getAllFilmsRequest, getAllFilmsSuccess } from './actions';

export interface IFilmsState {
  loading: boolean;
  films: {
    id: string;
    title: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    rt_score: string;
    people: string;
    species: string;
    locations: string;
    url: string;
  }[];
}

const initialState: IFilmsState = {
  loading: false,
  films: [],
};

export const allFilmsReducer = createReducer(initialState, {
  [getAllFilmsRequest.type]: state => {
    state.loading = true;
    state.films = [];
  },
  [getAllFilmsSuccess.type]: (state, action) => {
    state.loading = false;
    state.films = uniqBy(action.payload, 'id');
  },
  [getAllFilmsFailed.type]: state => {
    state.loading = false;
  },
});
