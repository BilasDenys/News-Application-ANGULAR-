import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { GetTopHeadlinesNews, ResetTopHeadlinesNews, SetPage } from '../../store/News/action';
import { INewsStore } from '../../store/News/reducer';
import { getPageSelector } from '../../store/News/selectors';

interface IButtonElemProps {
  title: string;
}
@UntilDestroy()
@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss']
})
export class PaginationButtonComponent implements OnInit {

  public currentPage!: number;

  @Input() buttonElemProps!: IButtonElemProps;

  constructor(private store$: Store<INewsStore>) { }

  ngOnInit(): void {

    this.store$.pipe(
      select( getPageSelector),
      untilDestroyed(this)
      ).subscribe((page: number) => this.currentPage = page )

  }


  setCurrentPage(page: number): void {
      this.store$.dispatch( new ResetTopHeadlinesNews() );
      this.store$.dispatch( new SetPage(page) );
      this.store$.dispatch( new GetTopHeadlinesNews() );
      window.scrollTo(0,0);
  }

}
