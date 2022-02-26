import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchAll, switchMap, tap } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { NewsService } from '../../services/news.service';
import { IResponseTopHeadlinesNews } from '../../types/news';
import { GetEverythingNews, GetEverythingNewsFail, GetEverythingNewsSuccess, GetTopHeadlinesNewsFail, GetTopHeadlinesNewsSuccess, NewsActionTypes } from './action';



@Injectable()

export class NewsEffects {
  constructor(
    private actions$: Actions,
    private newsService: NewsService
    ) {}

  
    fetchTopHeadlines$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(NewsActionTypes.GET_TOP_HEADLINES_NEWS),
          exhaustMap(action =>
            this.newsService.fetchTopHeadlinesNews().pipe(
              tap( () => console.log('from top-headlines action', action)),
              map((response: IResponseTopHeadlinesNews) => new GetTopHeadlinesNewsSuccess(response)),
              catchError(error => of( new GetTopHeadlinesNewsFail(error.message)))
            )
          )
        )
    );

    fetchEverythingNews$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(NewsActionTypes.GET_EVERYTHING_NEWS),
          exhaustMap(action =>
            this.newsService.fetchTopHeadlinesNews().pipe(
              map((response: IResponseTopHeadlinesNews) => new GetEverythingNewsSuccess(response)),
              catchError(error => of( new GetEverythingNewsFail(error.message)))
            )
          )
        )
    )
      
}