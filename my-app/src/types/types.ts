import { RefObject } from 'react';
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
