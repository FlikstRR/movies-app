import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TvShowDto, TvShow } from '../models/tvshow';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Credits, Images, VideoDto } from '../models/shared';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {
  //searchTvShows
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'aef094546446ccb0159276bad9ef8c02';

  constructor(private http: HttpClient) {}

  getByType(type: string = 'upcoming', count: number = 12) {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getByGenre(genreId: string, page: number) {
    return this.http
      .get<TvShowDto>(`${this.baseUrl}/discover/tv/?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  search(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';

    return this.http
      .get<TvShowDto>(`${this.baseUrl}${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  get(id: string) {
    return this.http.get<TvShow>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getVideos(id: string) {
    return this.http.get<VideoDto>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getImages(id: string) {
    return this.http.get<Images>(`${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`);
  }

  getCredits(id: string) {
    return this.http.get<Credits>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`);
  }

  getSimilar(id: string, page?: number) {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}&page=${page}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, 4));
      })
    );
  }
}
