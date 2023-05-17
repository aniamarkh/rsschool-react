import { describe, test, expect } from 'vitest';
import { CardData } from 'types/types';
import { findMaxId, handleDateChange } from './utils';

describe('Utility functions', () => {
  test('findMaxId returns the correct maximum id value', () => {
    const data: Array<CardData> = [
      {
        id: 1,
        imgSrc: 'assets/img/movie0.jpg',
        imgAlt: 'Sample Movie 0',
        title: 'Sample Movie 0',
        isSequel: false,
        genre: 'comedy',
        date: '04.04.2023',
      },
      {
        id: 2,
        imgSrc: 'assets/img/movie1.jpg',
        imgAlt: 'Sample Movie 1',
        title: 'Sample Movie 1',
        isSequel: true,
        genre: 'horror',
        date: '02.04.2023',
      },
      {
        id: 3,
        imgSrc: 'assets/img/movie2.jpg',
        imgAlt: 'Sample Movie 2',
        title: 'Sample Movie 2',
        isSequel: false,
        genre: 'drama',
        date: '30.03.2023',
      },
    ];
    const maxId = findMaxId(data);
    expect(maxId).toBe(4);
  });

  test('findMaxId returns 1 when the input array is empty', () => {
    const data: CardData[] = [];

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
