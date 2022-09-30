import { SpokenLanguage, Item } from './shared';
import { Genre } from './genres';

export interface TvShowDto {
  page: number;
  results: TvShow[];
  total_results: number;
  total_pages: number;
}

export interface TvShow {
  backdrop_path: string | null;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  genre_ids: number[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_countries: Country[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export const mapTvShowToItem = (tvShow: TvShow): Item => {
  return {
    backdrop_path: tvShow.backdrop_path,
    id: tvShow.id,
    overview: tvShow.overview,
    poster_path: tvShow.poster_path,
    release_date: tvShow.first_air_date,
    title: tvShow.name,
    vote_average: tvShow.vote_average,
    vote_count: tvShow.vote_count
  };
};
