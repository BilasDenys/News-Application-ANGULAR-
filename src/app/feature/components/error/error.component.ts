import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INewsStore } from '../../store/News/reducer';
import { getNewsErrorSelector } from '../../store/News/selectors';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public errorMessage$!: Observable<string | null>

  constructor(private store$: Store<INewsStore>) { }

  ngOnInit(): void {

    this.errorMessage$ = this.store$.pipe(select(getNewsErrorSelector))
    
  }

}
