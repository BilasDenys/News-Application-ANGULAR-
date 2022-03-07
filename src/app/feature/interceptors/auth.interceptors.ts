import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetTopHeadlinesNewsFail } from '../store/News/action';
import { INewsStore } from '../store/News/reducer';

@Injectable()
export class AuthInterceptors implements HttpInterceptor {

  constructor( private store$: Store<INewsStore> ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authRequest = req.clone({
       headers: req.headers.set('X-Api-Key', `${environment.newsApiKey}`),
       params: req.params.set('language', 'en')
    });

    return next.handle(authRequest)
      .pipe(
        tap(
          (event) => {
            // if (event instanceof HttpResponse) console.log('Server response');
          },
          (err) => {
            console.log('from interceptor ',err.error);
            
            if ( err instanceof HttpErrorResponse ) {
              
              if ( err.status == 401 )  new GetTopHeadlinesNewsFail(err.error.message);

              if ( err.status == 429 )  new GetTopHeadlinesNewsFail( err.error.message);
            }
          }
        )
      )
    
  }

}