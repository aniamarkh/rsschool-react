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
}

export interface InputProps {
  label: string;
  inputRef?: RefObject<HTMLInputElement>;
  selectRef?: RefObject<HTMLSelectElement>;
}

export interface PriceObj {
  value: string;
  label: string;
}

export interface FormState {
  errors: string[];
  submitted: boolean;
}
