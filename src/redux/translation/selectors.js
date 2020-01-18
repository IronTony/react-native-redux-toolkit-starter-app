import { createSelector } from 'reselect';

const translationsSelector = state => state.translation;

export const makeSelectBaseLanguage = createSelector(
  translationsSelector,
  translationsState => translationsState.locale,
);
