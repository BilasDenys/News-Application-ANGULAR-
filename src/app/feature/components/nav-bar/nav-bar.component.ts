import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { INewsCountryCode, NewsService } from '../../services/news.service';
import { GetEverythingNews, GetTopHeadlinesNews, SetCountry, SetLimit } from '../../store/News/action';
import { INewsStore } from '../../store/News/reducer';
import { getCountrySelector, getLimitSelector } from '../../store/News/selectors';


@UntilDestroy()
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements OnInit {

  limits = [
    {title: '20', count: 20},
    {title: '25', count: 25},
    {title: '30', count: 30},
    {title: '35', count: 35},
    {title: '40', count: 40},
    {title: '45', count: 45},
    {title: '50', count: 50},
    {title: '55', count: 55},
    {title: '60', count: 60},
    {title: '65', count: 65},
    {title: '70', count: 70},
    {title: '75', count: 75},
    {title: '80', count: 80},
    {title: '85', count: 85},
    {title: '90', count: 90},
    {title: '95', count: 95},
    {title: '100', count: 100},
  ]

  private _countries!: INewsCountryCode[];
  public selectedCountry!: string;
  public selectedLimit!: number;
  public search!: string;

  constructor(
    private newsService: NewsService,
    private store$: Store<INewsStore>,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initialFunction();
  }

  private initialFunction(): void {
    this._countries = this.newsService.newsCountriesStaticData;

    this.store$
      .pipe(select( getCountrySelector ),
       untilDestroyed(this))
      .subscribe(( country: string ): string => this.selectedCountry = country);

    this.store$
      .pipe( select( getLimitSelector ),
      untilDestroyed(this))
      .subscribe( ( limit: number ): number => this.selectedLimit = limit )
  }

  public get countries(): INewsCountryCode[] {
    return this._countries;
  }

  public change( event: any ): void {
    const { name, value } = event.target;
    const countrySelectName = 'country';

    if( name === countrySelectName ) {

      this.store$.dispatch( new SetCountry( value ) );
      this.store$.dispatch( new GetTopHeadlinesNews() );

    } else {

      this.store$.dispatch( new SetLimit( +value ) );
      this.store$.dispatch( new GetTopHeadlinesNews() );
      
    }

  }

  public findSearch() {

    if( this.search.trim().length != 0) {
      this.store$.dispatch( new GetEverythingNews(this.search) )
      this.search = '';
      this.route.navigate(['everything/', this.search])
    }
  }

}
  