import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { LocalStorageService } from '../../services/local-storage.service';
import { NewsService } from '../../services/news.service';
import { GetTopHeadlinesNews, ResetTopHeadlinesNews, SetCategory, SetPage } from '../../store/News/action';
import { INewsStore } from '../../store/News/reducer';

import { 
  getIsLoadingSelector,
  getPageSelector, 
  getCategorySelector, 
  getTotalResultsSelector,
  getLimitSelector
} from '../../store/News/selectors';

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  public categories!: string[];
  public category!: string;
  public page!: number;
  private _totalResults!: number;
  private _limit!: number;
  public pagination!: any[];

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
      .subscribe((categoryFromStore: string) => this.category = categoryFromStore);
    
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

    const data = this.localStorageService.getKey('new');

    if ( !data ) {
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
    this.category = title;

    this.store$.dispatch( new SetCategory( title ) );
    this.store$.dispatch( new ResetTopHeadlinesNews() )
    this.store$.dispatch( new GetTopHeadlinesNews() );

  }

  change( step: number ) {
    this.page + step;
    this.store$.dispatch( new SetPage(this.page) )
    this.store$.dispatch( new GetTopHeadlinesNews());
  }

  private generateButtonForPagination() {

    const sum = Math.ceil(this.totalResults / this.limit);

    this.pagination  =  Array(sum).fill('').map( (item, index) => {

      const obj = { title: index + 1 };
      return obj;

    })
      
  }

}
