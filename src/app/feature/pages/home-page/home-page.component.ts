import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { NewsService } from '../../services/news.service';
import { GetTopHeadlinesNews, ResetTopHeadlinesNews, SetCategory, SetPage } from '../../store/News/action';
import { INewsStore } from '../../store/News/reducer';

import { 
  getIsLoadingSelector,
  getPageSelector, 
  getCategorySelector, 
  getTotalResultsSelector,
  getLimitSelector,
  getTopHeadlinesNewsSelector,
  getEverythingNewsSelector,
  getNewsErrorSelector
} from '../../store/News/selectors';
import { ITopHeadlinesArticles } from '../../types/news';

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  public categories!: string[];
  public categoryFromTS!: string;
  public page!: number;
  private _totalResults!: number;
  private _limit!: number;
  public pagination!: any[];
  public isLoading!: boolean;
  public errorMessage$!: Observable<string | null>

  public topHeadlineNews!: ITopHeadlinesArticles[];

  constructor(
    private store$: Store<INewsStore>,
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initFunction();
  }

  private initFunction() {

    this.categories = ['business','entertainment','general','health','science','sports','technology'];

    this.store$.pipe(
      select(getCategorySelector),
      untilDestroyed(this))
      .subscribe((categoryFromStore: string) => this.categoryFromTS = categoryFromStore);
    
    this.store$.pipe(
      select(getPageSelector),
      untilDestroyed(this))
      .subscribe((page: number) => this.page = page);

    this.store$.pipe(
      select(getTotalResultsSelector),
      untilDestroyed(this))
      .subscribe((totalResult: number) => this._totalResults = totalResult )  

    this.store$.pipe(
      select(getLimitSelector),
      untilDestroyed(this))
      .subscribe((limit: number) => this._limit = limit )  


    this.store$.pipe(
      select( getTopHeadlinesNewsSelector ),
      untilDestroyed(this)
    ).subscribe( (articles: ITopHeadlinesArticles[]) => {

      this.topHeadlineNews = articles;
      this.generateButtonForPagination();
      
    });

    this.errorMessage$ = this.store$.pipe(select( getNewsErrorSelector ))

    this.store$.pipe(
      select (getIsLoadingSelector),
      untilDestroyed( this))
      .subscribe( (isLoading: boolean) => {
        this.isLoading = isLoading
      })

    const data = this.localStorageService.getKey('news');  

    if ( data.topHeadlinesNews.length === 0 ) {
      new GetTopHeadlinesNews();
    }

    this.generateButtonForPagination()

  }

  public get totalResults(): number {
    return this._totalResults;
  }

  private get limit(): number {
    return this._limit;
  }

  public tabChange(title: string): void {
    this.categoryFromTS = title;

    this.store$.dispatch( new SetCategory( title ) );
    this.store$.dispatch( new ResetTopHeadlinesNews() )
    this.store$.dispatch( new GetTopHeadlinesNews() );


  }

  change( step: number ) {
    const page =  this.page + step;
    this.store$.dispatch( new SetPage(page) )
    this.store$.dispatch( new GetTopHeadlinesNews());
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private generateButtonForPagination() {

    const sum = Math.ceil(this.totalResults / this.limit);

    this.pagination  =  Array(sum).fill('').map( (item, index) => {

      const obj = { title: index + 1 };
      return obj;

    })
      
  }

}
