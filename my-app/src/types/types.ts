import { RefObject } from 'react';

export interface SearchBarState {
  searchValue: string;
}

export interface PlantData {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  petFriendly: boolean;
  price: number;
  date: string;
  isEasy: boolean;
}

export interface InputProps {
  label: string;
  inputRef: RefObject<HTMLInputElement>;
}

export interface FormState {
  errors: string[];
  submitted: boolean;
}
