import { UseFormRegister, RegisterOptions } from 'react-hook-form';

export interface SearchBarState {
  searchValue: string;
}

export interface PlantData {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  petFriendly: boolean | null;
  price: number;
  date: string;
}

export interface InputProps {
  label: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  registerOptions: RegisterOptions<FormValues>;
  onUpload?: (imgSrc: string | null) => void;
}

export interface PriceObj {
  value: number;
  label: string;
}

export interface PetOption {
  value: string;
  label: string;
}

export interface FormValues {
  title: string;
  date: string;
  price: string;
  petFriendly: string;
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
