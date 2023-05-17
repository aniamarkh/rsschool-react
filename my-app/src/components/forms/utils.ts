import { CardData } from 'types/types';

export const findMaxId = (data: CardData[]): number => {
  if (data.length === 0) {
    return 0;
  } else {
    return (
      Math.max(
        ...data.map((object: CardData) => {
          return object.id;
        })
      ) + 1
    );
  }
};

export const handleDateChange = (date: string): string => {
  return date.split('-').reverse().join('.');
};
