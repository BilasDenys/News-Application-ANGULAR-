import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponseTopHeadlinesNews } from '../types/news';

export interface INewsCountryCode {
  country: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _newsCountriesStaticData: INewsCountryCode[] = [
    { country: 'Argentina', code: 'ar'},
    { country: 'Australia', code: 'au' },
    { country: 'Austria', code: 'at' },
    { country: 'Belgium', code: 'be' },
    { country: 'Brazil', code: 'br' },
    { country: 'Bulgaria', code: 'bg' },
    { country: 'Canada', code: 'ca' },
    { country: 'China', code: 'cn' },
    { country: 'Colombia', code: 'co' },
    { country: 'Cuba', code: 'cu' },
    { country: 'Czech Republic', code: 'cz' },
    { country: 'Egypt', code: 'eg' },
    { country: 'France', code: 'fr' },
    { country: 'Germany', code: 'de' },
    { country: 'Greece', code: 'gr' },
    { country: 'Hong Kong', code: 'hk' },
    { country: 'Hungary', code: 'hu' },
    { country: 'India', code: 'in' },
    { country: 'Indonesia', code: 'id' },
    { country: 'Ireland', code: 'ie' },
    { country: 'Israel', code: 'il' },
    { country: 'Italy', code: 'it' },
    { country: 'Japan', code: 'jp' },
    { country: 'Latvia', code: 'lv' },
    { country: 'Lithuania', code: 'lt' },
    { country: 'Malaysia', code: 'my' },
    { country: 'Mexico', code: 'mx' },
    { country: 'Morocco', code: 'ma' },
    { country: 'Netherlands', code: 'nl' },
    { country: 'New Zealand', code: 'no' },
    { country: 'Nigeria', code: 'ph' },
    { country: 'Norway', code: 'pl' },
    { country: 'Philippines', code: 'pt' },
    { country: 'Poland', code: 'pt' },
    { country: 'Romania', code: 'ro' },
    { country: 'Russia', code: 'ru' },
    { country: 'Saudi Arabia', code: 'sa' },
    { country: 'Serbia', code: 'rs' },
    { country: 'Singapore', code: 'sg' },
    { country: 'Slovakia', code: 'sk' },
    { country: 'Slovenia', code: 'si' },
    { country: 'South Africa', code: 'za' },
    { country: 'South Korea', code: 'kr' },
    { country: 'Sweden', code: 'se' },
    { country: 'Switzerland', code: 'ch' },
    { country: 'Taiwan', code: 'tw' },
    { country: 'Thailand', code: 'th' },
    { country: 'Turkey', code: 'tr' },
    { country: 'UAE', code: 'ae' },
    { country: 'Ukraine', code: 'ua' },
    { country: 'United Kingdom', code: 'uk' },
    { country: 'United States', code: 'us' },
    { country: 'Venuzuela', code: 've' },
  ];

  constructor( private http: HttpClient ) { }
    //  /top-headlines?country=${country}&category=${category}&page=${page}

  public fetchTopHeadlinesNews(params: any): Observable<IResponseTopHeadlinesNews> {
    const { category, country, limit, currentPage } = params[1].news;
    console.log(params[1])
    return this.http.get<IResponseTopHeadlinesNews>(`${environment.newsBaseURL}/top-headlines?country=${country}&category=${category}&page=${currentPage}&pageSize=${limit}`);
  }

  public fetchEverythingNews(params: any): Observable<IResponseTopHeadlinesNews> {
    const { payload } = params[0];
    const { limit, currentPage } = params[1].news;
    return this.http.get<IResponseTopHeadlinesNews>(`${environment.newsBaseURL}/top-headlines?q=${payload}&page=${currentPage}&pageSize=${limit}`);
  }

  public fetchSourcesNews(): Observable<IResponseTopHeadlinesNews> {
    return this.http.get<IResponseTopHeadlinesNews>('');
  }

  public get newsCountriesStaticData() {
    return this._newsCountriesStaticData;
  }

}
