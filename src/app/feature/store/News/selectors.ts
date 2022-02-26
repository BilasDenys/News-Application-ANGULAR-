import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INewsStore } from './reducer';

const newsFeatureSelector = createFeatureSelector<INewsStore>('news');

export const getIsLoadingSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore) => state.isLoading
);

export const getTopHeadlinesNewsSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore) => state.topHeadlinesNews
);

export const getEverythingNewsSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore) => state.everythingNews
);

export const getLimitSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore) => state.limit
);

export const getNewsErrorSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore) => state.newsError
);

export const getTotalResultsSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore) => state.totalResults
);

export const getCountrySelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore) => state.country
);

