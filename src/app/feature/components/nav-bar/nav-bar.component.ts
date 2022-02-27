import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { INewsCountryCode, NewsService } from '../../services/news.service';
import { SetCountry } from '../../store/News/action';
import { INewsStore } from '../../store/News/reducer';
import { getCountrySelector } from '../../store/News/selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {

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

  countryFromStore!: string;

  private _countries!: INewsCountryCode[];
  selected: string = '';
  private sub$!: Subscription;

  form!: FormGroup;

  constructor(
    private newsService: NewsService,
    private fb: FormBuilder,
    private store$: Store<INewsStore>
  ) {}

  ngOnInit(): void {
    this.initialFunction();
    this.sub$ = this.store$
      .pipe(select(getCountrySelector))
      .subscribe((country) => {
        this.countryFromStore = country;
      });
  }

  private initialFunction(): void {
    this.form = this.fb.group({
      newsCountry: ['', [Validators.required]],
    });

    this._countries = this.newsService.newsCountriesData;
  }

  get countries(): INewsCountryCode[] {
    return this._countries;
  }

  change(event: any) {
    const countrySelectName = 'country';

    if( event.target.name === countrySelectName) {
      console.log(`${event.target.name}: ${event.target.value}`);
      
      this.store$.dispatch(new SetCountry(event.target.value));
    } else {
      console.log(`${event.target.name}: ${event.target.value}`);
    }
 
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
