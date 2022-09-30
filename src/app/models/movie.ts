import { SpokenLanguage, Collection, ProductionCompany, ProductionCountry, Item } from './shared';
import { Genre } from './genres';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  genre_ids: number[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: 758004063;
  runtime: 119;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDto {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const mapMovieToItem = (movie: Movie): Item => {
  return {
    backdrop_path: movie.backdrop_path,
    id: movie.id,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count
  };
};
