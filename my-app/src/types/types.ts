import { UseFormRegister, RegisterOptions } from 'react-hook-form';

export interface SearchBarState {
  searchValue: string;
}

export interface FormCardsState {
  formCards: CardData[];
}

export interface CardData {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  isSequel: boolean | null;
  genre: string;
  date: string;
}

export interface InputProps {
  label: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  registerOptions: RegisterOptions<FormValues>;
  onUpload?: (imgSrc: string | null) => void;
}

export interface GenreObj {
  value: string;
  label: string;
}

export interface sequelOption {
  value: string;
  label: string;
}

export interface FormValues {
  title: string;
  date: string;
  genre: string;
  isSequel: string;
  imgSrc: FileList;
  checkbox: boolean;
}

export interface TmdbMovieResult {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface MovieData {
  id: number;
  poster: string;
  date: string;
  title: string;
}

export interface MovieResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ModalData {
  title: string;
  original_title: string;
  poster: string;
  genres: string[];
  release: string;
  rate: number;
  overview: string | null;
  homepage: string | null;
  country: string[];
  prod: string[];
}
