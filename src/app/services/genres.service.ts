import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { GenresDto } from '../models/genres';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'aef094546446ccb0159276bad9ef8c02';

  constructor(private http: HttpClient) {}

  getGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }
}
