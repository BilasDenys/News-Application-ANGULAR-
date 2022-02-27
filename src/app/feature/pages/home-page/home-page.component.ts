import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetEverythingNews, SetCategory } from '../../store/News/action';
import { INewsStore } from '../../store/News/reducer';

import { getIsLoadingSelector, getLimitSelector } from '../../store/News/selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  categories: string[] = ['business','entertainment','general','health','science','sports','technology'];
  category!: string;
  constructor(
    private http: HttpClient,
    private store$: Store<INewsStore>
    ) { }

  ngOnInit(): void {

    this.category = 'general'

    // const isLoading$ = this.store$.pipe(select(getIsLoadingSelector));
    // const limit$ = this.store$.pipe(select(getLimitSelector));

    // this.store$.dispatch(new GetEverythingNews());

    // isLoading$.subscribe(status => console.log(status));
    // limit$.subscribe(limit => console.log(limit));

    // this.http.get('https://newsapi.org/v2/top-headlines/sources?apiKey=0b523ee8e946476cb7b1f4fb913cb30f')
    // .subscribe(response => {
    //   console.log(response);
    // })
    
  }

  tabChange(title: string){
    this.category = title;

    this.store$.dispatch(new SetCategory(title));

  }

}
