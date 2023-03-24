import { PlantData } from 'types/types';

export const findMaxId = (data: PlantData[]): number => {
  return (
    Math.max(
      ...data.map((object: PlantData) => {
        return object.id;
      })
    ) + 1
  );
};

export const handleDateChange = (date: string): string => {
  return date.split('-').reverse().join('.');
};