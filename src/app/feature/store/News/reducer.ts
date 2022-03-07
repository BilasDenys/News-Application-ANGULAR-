import { NewsActions, NewsActionTypes } from './action';

export interface INewsStore {

  isLoading: boolean;
  topHeadlinesNews: [],
  everythingNews: [],
  newsError: string | null,
  totalResults: number,
  country: string,
  limit: number,
  category: string,
  currentPage: number

}

const initialState: INewsStore = {

  isLoading: false,
  topHeadlinesNews: [],
  everythingNews: [],
  newsError: '',
  totalResults: 0,
  country: 'us',
  limit: 20,
  category: 'general',
  currentPage: 1

}

export const reducer = (state = initialState, action: NewsActions) => { 
  switch (action.type) {

    case NewsActionTypes.GET_TOP_HEADLINES_NEWS:

      return {
        ...state, 
        isLoading: true,
        everythingNews: []
      }

    case NewsActionTypes.GET_TOP_HEADLINES_NEWS_SUCCESS:

      return {
        ...state, 
        isLoading: false, 
        topHeadlinesNews: [ ...state.topHeadlinesNews, ...action.payload.articles ],
        totalResults: action.payload.totalResults
      }
    
    case NewsActionTypes.GET_TOP_HEADLINES_NEWS_FAIL:

      return {
        ...state, 
        isLoading: false, 
        newsError: action.payload
      }

    case NewsActionTypes.RESET_TOP_HEADLINES_NEWS:
      return {
        ...state, topHeadlinesNews: []
      }  

    case NewsActionTypes.GET_EVERYTHING_NEWS:

      return {
        ...state, 
        isLoading: true,
        currentPage: 1
      }

    case NewsActionTypes.GET_EVERYTHING_NEWS_SUCCESS:

      return {
        ...state, 
        isLoading: false, 
        everythingNews: [ ...state.everythingNews, ...action.payload.articles ], 
        totalResults: action.payload.totalResults
      }
    
    case NewsActionTypes.GET_EVERYTHING_NEWS_FAIL:

      return {
        ...state, 
        isLoading: false, 
        newsError: action.payload
      }

    case NewsActionTypes.RESET_EVERYTHING_NEWS_FAIL:

      return {
        ...state, everythingNews: []
      }  
    
    case NewsActionTypes.SET_LIMIT:

      return {
        ...state, 
        limit: action.payload,
      }
    
    case NewsActionTypes.SET_COUNTRY:

      return {
        ...state, 
        country: action.payload,
        currentPage: 1
      }
    
    case NewsActionTypes.SET_CATEGORY:
      
      return {
        ...state, 
        category: action.payload,
        currentPage: 1,
        totalResults: 0
      }
      
    case NewsActionTypes.GET_PAGE:
      return state  
    
    case NewsActionTypes.SET_PAGE:
      
      return {
        ...state, 
        currentPage: action.payload
      }

    default:
      return state;
  }
 };