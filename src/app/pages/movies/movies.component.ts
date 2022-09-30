import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Item } from '../../models/shared';
import { mapMovieToItem } from '../../models/movie';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Item[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  paginate(event: any) {
    const pageNumber = event.page + 1;

    if (this.genreId && !this.searchValue) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }

  getPagedMovies(page: number = 1, searchKeyword?: string) {
    this.moviesService.search(page, searchKeyword).subscribe((movies) => {
      this.movies = movies.map((movie) => mapMovieToItem(movie));
    });
  }

  getMoviesByGenre(genreId: string, page: number = 1) {
    this.moviesService.getByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies.map((movie) => mapMovieToItem(movie));
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId);
      } else {
        this.getPagedMovies();
      }
    });
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
