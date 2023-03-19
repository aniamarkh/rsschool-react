export interface SearchBarState {
  searchValue: string;
}

export interface PlantData {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  petFriendly: boolean;
  inStock: number;
  price: number;
}
