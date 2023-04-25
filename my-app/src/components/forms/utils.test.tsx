import { describe, test, expect } from 'vitest';
import { PlantData } from 'types/types';
import { findMaxId, handleDateChange } from './utils';

describe('Utility functions', () => {
  test('findMaxId returns the correct maximum id value', () => {
    const data: Array<PlantData> = [
      {
        id: 1,
        imgSrc: 'assets/img/fiddleleaf.jpg',
        imgAlt: 'Fiddle Leaf Fig',
        title: 'Fiddle Leaf Fig',
        petFriendly: false,
        price: 26,
        date: '04.04.2023',
      },
      {
        id: 2,
        imgSrc: 'assets/img/snake.jpg',
        imgAlt: 'Snake Plant',
        title: 'Snake Plant',
        petFriendly: true,
        price: 13,
        date: '02.04.2023',
      },
      {
        id: 3,
        imgSrc: 'assets/img/rubber.jpg',
        imgAlt: 'Rubber Plant',
        title: 'Rubber Plant',
        petFriendly: false,
        price: 19,
        date: '30.03.2023',
      },
    ];
    const maxId = findMaxId(data);
    expect(maxId).toBe(4);
  });

  test('findMaxId returns 1 when the input array is empty', () => {
    const data: PlantData[] = [];

    const maxId = findMaxId(data);
    expect(maxId).toBe(0);
  });

  test('handleDateChange correctly formats the date', () => {
    const inputDate = '2023-04-01';
    const expectedDate = '01.04.2023';

    const formattedDate = handleDateChange(inputDate);
    expect(formattedDate).toBe(expectedDate);
  });

  test('handleDateChange returns an empty string when the input date is empty', () => {
    const inputDate = '';
    const expectedDate = '';

    const formattedDate = handleDateChange(inputDate);
    expect(formattedDate).toBe(expectedDate);
  });
});
