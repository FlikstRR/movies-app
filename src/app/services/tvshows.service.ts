import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TvShowDto, TvShow } from '../models/tvshow';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {
  //searchTvShows
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'aef094546446ccb0159276bad9ef8c02';

  constructor(private http: HttpClient) {}

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';

    return this.http
      .get<TvShowDto>(`${this.baseUrl}${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
