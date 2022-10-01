import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/shared';
import { mapTvShowToItem } from '../../models/tvshow';
import { mapMovieToItem } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingMovies: Item[] = [];
  popularMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTvShows: Item[] = [];

  constructor(private moviesService: MoviesService, private tvshowsService: TvshowsService) {}

  ngOnInit(): void {
    this.moviesService.getByType('popular').subscribe((movies) => {
      this.popularMovies = movies.map((movie) => mapMovieToItem(movie));
    });

    this.moviesService.getByType('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies.map((movie) => mapMovieToItem(movie));
    });

    this.moviesService.getByType('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies.map((movie) => mapMovieToItem(movie));
    });

    this.tvshowsService.getByType('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }
}
