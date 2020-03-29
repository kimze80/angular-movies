import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apikey = '32b2538fae9d6a2e14d1539dde85893f';

  baseUrl = (endpoint, page = 1, query = null) =>
    `https://api.themoviedb.org/3/${endpoint}?api_key=${
      this.apikey
    }&page=${page}${typeof query === 'string' ? '&query=' + query : ''}&language=en-US`

  getCategoryRaw = (category: string, page: number) => {
    category = category.toLowerCase();
    const validCategories = ['popular', 'upcoming', 'top_rated', 'now_playing'];
    if (validCategories) {
      return this.http.get(this.baseUrl('movie/' + category, page)).toPromise();
    } else {
      console.log('wrong category');
    }
  }

  public getMovieRaw = (id: string) => {
    // tslint:disable: semicolon
    return this.http.get(this.baseUrl('movie/' + id)).toPromise()
  }

  public searchMovieRaw = query =>
    this.http.get(this.baseUrl('search/movie', 1, query)).toPromise()
}
