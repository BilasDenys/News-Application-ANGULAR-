import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INewsStore } from '../../store/News/reducer';
import { getEverythingNewsSelector, getIsLoadingSelector, getNewsErrorSelector, getTotalResultsSelector } from '../../store/News/selectors';
import { ITopHeadlinesArticles } from '../../types/news';


@UntilDestroy()
@Component({
  selector: 'app-everything-page',
  templateUrl: './everything-page.component.html',
  styleUrls: ['./everything-page.component.scss']
})
export class EverythingPageComponent implements OnInit {

  public results$!: Observable<number>;
  public isLoading$!: Observable<boolean>;
  public articles$!: Observable<ITopHeadlinesArticles[]>;
  public errorMessage$!: Observable<string | null>;

  constructor( private store$: Store<INewsStore> ) { }

  ngOnInit(): void {
    this.initialFunc();
  }


  initialFunc() {

    this.results$ = this.store$.pipe(select(getTotalResultsSelector));

    this.isLoading$ = this.store$.pipe(select(getIsLoadingSelector));

    this.articles$ = this.store$.pipe(select(getEverythingNewsSelector));

    this.errorMessage$ = this.store$.pipe(select(getNewsErrorSelector))

  }

}
