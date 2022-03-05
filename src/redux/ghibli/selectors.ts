import type { RootState } from '@redux/reducers';
import { createSelector } from '@reduxjs/toolkit';

const allFilmsSelector = (state: RootState) => state.films;

export const allFilms = createSelector(allFilmsSelector, filmsState => filmsState.films);
export const allFilmsLoading = createSelector(allFilmsSelector, filmsState => filmsState.loading);
