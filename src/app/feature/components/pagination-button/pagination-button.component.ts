import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { SetPage } from '../../store/News/action';
import { INewsStore } from '../../store/News/reducer';
import { getPageSelector } from '../../store/News/selectors';


@UntilDestroy()
@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss']
})
export class PaginationButtonComponent implements OnInit {

  currentPage!: number;

  constructor(private store$: Store<INewsStore>) { }

  ngOnInit(): void {
    this.store$.pipe(select(getPageSelector), 
    untilDestroyed(this))
    .subscribe( (currentPage: number) => this.currentPage = currentPage)
  }

  public  selectedPage(page: number): void {
    this.store$.dispatch( new SetPage( page ) )
  }

}
