import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapMovieToItem, Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/image-sizes';
import { Subscription } from 'rxjs';
import { Credits, Images, Item, Video } from 'src/app/models/shared';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieItem: Item | null = null;
  id: string | null = null;
  imageSizes = IMAGES_SIZES;
  movieVideos: Video[] = [];
  movieImages: Images | null = null;
  movieCredits: Credits | null = null;
  similarMovies: Item[] = [];

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
    this.moviesService.getVideos(id).subscribe((movieVideosData) => {
      this.movieVideos = movieVideosData;
    });
  }

  getMovie(id: string) {
    this.moviesService.get(id).subscribe((movieData) => {
      this.movie = movieData;
      this.movieItem = mapMovieToItem(movieData);
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getImages(id).subscribe((movieImagesData) => {
      this.movieImages = movieImagesData;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getCredits(id).subscribe((movieCreditsData) => {
      this.movieCredits = movieCreditsData;
    });
  }

  getSimilarMovies(id: string, page: number = 1) {
    this.moviesService.getSimilar(id, page).subscribe((movies) => {
      this.similarMovies = movies.map((movie) => mapMovieToItem(movie));
    });
  }
}
