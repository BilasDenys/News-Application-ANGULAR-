import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap, timeout, withLatestFrom } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { IResponseTopHeadlinesNews } from '../../types/news';
import { 
  GetEverythingNewsFail, 
  GetEverythingNewsSuccess, 
  GetTopHeadlinesNewsFail, 
  GetTopHeadlinesNewsSuccess, 
  NewsActionTypes, 
  ResetEverythingNews
} from './action';
import { INewsStore } from './reducer';


@Injectable()

export class NewsEffects {
  constructor(
    private actions$: Actions,
    private newsService: NewsService,
    private store$: Store<INewsStore>
    ) {}
  
    fetchTopHeadlinesNews$ = createEffect(() => this.actions$.pipe(
      ofType(NewsActionTypes.GET_TOP_HEADLINES_NEWS),
      withLatestFrom(this.store$.select( state => state )),
        tap( response => {
          const [ , {country, category, currentPage, limit } ] = response;
          return { country, category, currentPage, limit };
        }),
      mergeMap((options) =>
        this.newsService.fetchTopHeadlinesNews(options).pipe( 
          timeout(2500),
          map(( resp: IResponseTopHeadlinesNews ) => {
            return new GetTopHeadlinesNewsSuccess( resp )
          }),
          catchError( error => of( new GetTopHeadlinesNewsFail( error.error.message ) )))
      ))
    );

    fetchEverythingNews$ = createEffect(() => this.actions$.pipe(
      ofType( NewsActionTypes.GET_EVERYTHING_NEWS ),
      withLatestFrom( this.store$.select(state => state )),
        tap( response => {
          this.store$.dispatch(new ResetEverythingNews());
          const [ arrayPage, {country, category, currentPage, limit } ] = response;
          const { payload } = arrayPage;
          return { country, category, currentPage, limit, payload };

        }),
      mergeMap((options) =>
        this.newsService.fetchEverythingNews( options ).pipe(
          timeout(2500),
          map(( resp: IResponseTopHeadlinesNews ) => {
            return new GetEverythingNewsSuccess( resp )
          }),
          catchError( error => of( new GetEverythingNewsFail( error.error.message ) )))
      ))
  );
      
}