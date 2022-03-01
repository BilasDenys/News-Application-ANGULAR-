import { Action } from '@ngrx/store';
import { IResponseTopHeadlinesNews, ITopHeadlinesArticles } from '../../types/news';


export enum NewsActionTypes {

    GET_TOP_HEADLINES_NEWS = '[ NEWS ] Get Top Headlines News',
    GET_TOP_HEADLINES_NEWS_SUCCESS = '[ NEWS ] Get Top Headlines News Success',
    GET_TOP_HEADLINES_NEWS_FAIL = '[ NEWS ] Get Top Headlines News Fail',
    RESET_TOP_HEADLINES_NEWS = '[ NEWS ] Reset Top Headlines News',

    GET_EVERYTHING_NEWS = '[ NEWS ] Get Everything News',
    GET_EVERYTHING_NEWS_SUCCESS = '[ NEWS ] Get Everything News Success',
    GET_EVERYTHING_NEWS_FAIL = '[ NEWS ] Get Everything News Fail',
    RESET_EVERYTHING_NEWS_FAIL = '[ NEWS ] Reset Everything News',

    SET_LIMIT = '[ NEWS ] Set Limit',
    SET_COUNTRY = '[ NEWS ] Set Country',
    SET_CATEGORY = '[ NEWS ] Set Category',


    GET_PAGE = '[ NEWS ] Get Page',
    SET_PAGE = '[ NEWS ] Set Page'

}

export class GetTopHeadlinesNews implements Action {

   readonly  type = NewsActionTypes.GET_TOP_HEADLINES_NEWS;

}

export class GetTopHeadlinesNewsSuccess implements Action {

   readonly  type =  NewsActionTypes.GET_TOP_HEADLINES_NEWS_SUCCESS
   constructor(public payload : IResponseTopHeadlinesNews) {}

}

export class GetTopHeadlinesNewsFail implements Action {

   readonly type =  NewsActionTypes.GET_TOP_HEADLINES_NEWS_FAIL
   constructor(public payload:  string) {}

}

export class GetEverythingNews implements Action {

   readonly  type =  NewsActionTypes.GET_EVERYTHING_NEWS;
   constructor( public payload: string){}

}

export class GetEverythingNewsSuccess implements Action {

   readonly  type =  NewsActionTypes.GET_EVERYTHING_NEWS_SUCCESS;
   constructor(public payload:  IResponseTopHeadlinesNews) {}

}

export class GetEverythingNewsFail implements Action {

   readonly  type =  NewsActionTypes.GET_EVERYTHING_NEWS_FAIL;
   constructor(public payload:  string) {}

}

export class SetLimit implements Action {

   readonly  type =  NewsActionTypes.SET_LIMIT;
   constructor(public payload: number) {}

}

export class SetCountry implements Action {

   readonly  type =  NewsActionTypes.SET_COUNTRY;
   constructor(public payload: string) {}

}


export class SetCategory implements Action {

  readonly type = NewsActionTypes.SET_CATEGORY;
  constructor(public payload: string) {}

}

export class GetPage implements Action {
   
   readonly type = NewsActionTypes.GET_PAGE;
   
}

export class SetPage implements Action {

   readonly type = NewsActionTypes.SET_PAGE;
   constructor(public payload: number) {}

}

export class ResetEverythingNews implements Action {
   
   readonly type = NewsActionTypes.RESET_EVERYTHING_NEWS_FAIL;
   
}

export class ResetTopHeadlinesNews implements Action {
   
   readonly type = NewsActionTypes.RESET_TOP_HEADLINES_NEWS;
   
}

export type  NewsActions =
      GetTopHeadlinesNews
    | GetTopHeadlinesNewsFail
    | GetTopHeadlinesNewsSuccess 
    | ResetTopHeadlinesNews
    | ResetEverythingNews
    | GetEverythingNews
    | GetEverythingNewsSuccess
    | GetEverythingNewsFail
    | SetLimit
    | SetCountry 
    | SetCategory 
    | SetPage 
    | GetPage

