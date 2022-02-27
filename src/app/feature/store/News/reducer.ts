import { NewsActions, NewsActionTypes } from './action';

export interface INewsStore {
  isLoading: boolean;
  topHeadlinesNews: [],
  everythingNews: [],
  newsError: string | null,
  totalResults: number | null,
  country: string,
  limit: number,
  category: string
}

const initialState: INewsStore = {
  isLoading: false,
  topHeadlinesNews: [],
  everythingNews: [],
  newsError: '',
  totalResults: 0,
  country: 'ua',
  limit: 20,
  category: 'general'
}

export const reducer = (state = initialState, action: NewsActions) => { 
  switch (action.type) {

    case NewsActionTypes.GET_EVERYTHING_NEWS:
      return {
        ...state, isLoading: true
      }

    case NewsActionTypes.GET_EVERYTHING_NEWS_SUCCESS:
      return {
        ...state, isLoading: false, topHeadlinesNews: action.payload.articles, totalResults: action.payload.totalResult
      }
    
    case NewsActionTypes.GET_EVERYTHING_NEWS_SUCCESS:
      return {
        ...state, isLoading: false, newsError: action.payload
      }

    case NewsActionTypes.GET_EVERYTHING_NEWS:
      return {
        ...state, isLoading: true
      }

    case NewsActionTypes.GET_EVERYTHING_NEWS_SUCCESS:
      return {
        ...state, isLoading: false, everythingNews: action.payload
      }
    
    case NewsActionTypes.GET_EVERYTHING_NEWS_FAIL:
      return {
        ...state, isLoading: false, newsError: action.payload
      }
    
    case NewsActionTypes.SET_LIMIT:
      return {
        ...state, limit: action.payload
      }
    
    case NewsActionTypes.SET_COUNTRY:
      return {
        ...state, country: action.payload
      }
    
    case NewsActionTypes.SET_CATEGORY:
      return {
        ...state, category: action.payload
      }

    default:
      return state;
  }
 };