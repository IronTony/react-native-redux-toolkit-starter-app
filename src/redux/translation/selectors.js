import { createSelector } from 'reselect';

const translationsSelector = state => state.translation;

export const selectBaseLanguage = createSelector(
  translationsSelector,
  translationsState => translationsState.locale,
);
