export interface Backdrop {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Poster {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideoDto {
  id: number;
  results: Video[];
}

export interface ImagesDto {
  id: number;
  backdrops: Backdrop[];
  posters: Poster[];
}

export interface Images {
  backdrops: {
    file_path: string;
  }[];
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Credits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}

export interface Item {
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}
