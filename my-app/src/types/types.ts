import { RefObject } from 'react';

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
  inputRef?: RefObject<HTMLInputElement>;
  selectRef?: RefObject<HTMLSelectElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PriceObj {
  value: number;
  label: string;
}

export interface PetOption {
  value: number;
  label: string;
}

export interface FormState {
  errors: ErrorsState;
  submitted: boolean;
  formData: PlantData;
}

export interface ErrorsState {
  title: string;
  date: string;
  price: string;
  petFriendly: string;
  imgSrc: string;
  checkbox: string;
}
