import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITopHeadlinesArticles } from '../../types/news';
import { INewsStore } from './reducer';

const newsFeatureSelector = createFeatureSelector<INewsStore>('news');

export const getIsLoadingSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore): boolean => state.isLoading
);

export const getTopHeadlinesNewsSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore): ITopHeadlinesArticles[] => state.topHeadlinesNews
);

export const getEverythingNewsSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore): ITopHeadlinesArticles[] => state.everythingNews
);

export const getLimitSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore): number  => state.limit
);

export const getNewsErrorSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore): string | null => state.newsError
);

export const getTotalResultsSelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore): number  => state.totalResults
);

export const getCountrySelector = createSelector(
  newsFeatureSelector, 
  (state: INewsStore): string => state.country
);


export const getCategorySelector = createSelector(
  newsFeatureSelector,
  (state: INewsStore): string => state.category
)

export const getPageSelector = createSelector(
  newsFeatureSelector,
  (state: INewsStore): number => state.currentPage
)

