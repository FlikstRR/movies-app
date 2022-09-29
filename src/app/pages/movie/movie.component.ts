import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/image-sizes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  id: string | null = null;
  imageSizes = IMAGES_SIZES;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];

  private urlSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.urlSubscription = this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  ngOnDestroy(): void {
    console.log(' destroying movies comp & subsc');
    this.urlSubscription?.unsubscribe();
  }

  paginate(event: any) {
    if (this.id) {
      this.getSimilarMovies(this.id, event.page + 1);
    }
  }

  getMovieVideos(id: any) {
    this.moviesService.getMovieVideos(id).subscribe((movieVideosData) => {
      this.movieVideos = movieVideosData;
    });
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((movieImagesData) => {
      this.movieImages = movieImagesData;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
      this.movieCredits = movieCreditsData;
    });
  }

  getSimilarMovies(id: string, page: number = 1) {
    this.moviesService.getSimilarMovies(id, page).subscribe((movies) => {
      this.similarMovies = movies;
    });
  }
}
